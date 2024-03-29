import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { orderBy } from 'lodash';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import CircularProgress from '@mui/material/CircularProgress';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import StarIcon from '@mui/icons-material/Star';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
// import RemoveIcon from '@mui/icons-material/Remove';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import { useTranslation } from 'react-i18next';
/* import { TableVirtuoso } from 'react-virtuoso'; */
import './Library.css';
import Classes from './Library.module.css';
// import rows from './data.json';
import { Button, Modal, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import ISBN from 'isbn-validate';
import { Rating } from 'react-simple-star-rating';
import axios from 'axios';
export default function Library({ filter, setFilter }) {
    const [myRows, setMyRows] = useState([]);
    const [visibleContent, setVisibleContent] = useState(-1);
    const [showSnackBar, handleSnackBar] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [removedItemName, setRemovedItemName] = useState('');

    //table sorting states
    const [sortOrder, setSortOrder] = useState(false);
    const [sortingColumn, setSortingColumn] = useState('');

    //Modal states
    const [showModal, handleModalBox] = useState(false);
    const [loading, setLoading] = useState(false);
    const [bookUploadError, setBookUploadError] = useState('');
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [publisher, setPublisher] = useState('');
    const [isbn, setIsbn] = useState('');
    const [year, setYear] = useState('');
    const [edition, setEdition] = useState('');
    const [error, setError] = useState(false);
    const [blankEntry, setBlankEntry] = useState(false);

    //Book review modal states
    const [showReviewModal, handleReviewModal] = useState(false);
    const [isReviewAdded, handleReviewAdded] = useState(false);
    const [bookName, setBookName] = useState('');
    const [bookReview, setBookReview] = useState('');
    const [rating, setRating] = useState(0);

    //Book read review modal states
    const [enableReviewModal, setEnableReviewModal] = useState(false);
    const [book, setBook] = useState({});
    //get loggedIn user email to send with bookObj for userId on new book entry
    const userEmail = JSON.parse(localStorage.getItem('user')).email;
    //get loggedIn user id to match with book userId
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    //This state helps us for two way in input filed
    const [isAdded, handleIsAdded] = useState(false);
    const { t } = useTranslation();
    const removeBookByName = async (row) => {
        try {
            setLoading(true);
            const response = await axios.delete(
                `http://localhost:3001/api/books/${row._id}`,
                {
                    data: {
                        bookId: row._id,
                        userId: row.userId,
                        userEmail,
                    },
                }
            );
            if (response.status === 200) {
                setRemovedItemName('removed ' + row.title + ' successfully');
                setVisibleContent(-1);
                fetchBooksFromDB();
                setIsDeleted(true);
            }
            // You can also update your state here to reflect the changes
        } catch (err) {
            setLoading(false);
            const errorMsg = err.response.data.message;
            setBookUploadError(errorMsg);
            handleSnackBar(true);
        }

        setLoading(false);
    };

    const addItemToTable = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (
                name &&
                author &&
                category &&
                publisher &&
                isbn &&
                year &&
                edition
            ) {
                let bookObj = {
                    name,
                    author,
                    category,
                    publisher,
                    isbn,
                    year,
                    edition,
                    reviews: [],
                    userEmail,
                };

                const response = await axios.post(
                    'http://localhost:3001/api/books/newbook',
                    { bookObj }
                );

                if (response.status === 200) {
                    handleIsAdded(true);
                    resetBookState();
                    handleModalBox(false);
                    fetchBooksFromDB();
                }
            } else {
                setBlankEntry(true);
            }
        } catch (err) {
            const errorMsg = err.response.data.message;
            setBookUploadError(errorMsg);
            handleSnackBar(true);
        }
        setLoading(false);
    };
    const addBooksToDB = async (fileBooks) => {
        try {
            const userData = JSON.parse(localStorage.getItem('user'));

            // Check if userData is not null before accessing its properties
            if (userData) {
                // Iterate through each book in the file
                for (const bookObj of fileBooks) {
                    const userId = userData._id;
                    const userEmail = userData.email;

                    const {
                        title,
                        author,
                        category,
                        publisher,
                        ISBN,
                        year,
                        edition,
                    } = bookObj;
                    console.log('Adding book', bookObj);

                    // Send a request to add the book to the backend
                    await axios.post(
                        'http://localhost:3001/api/books/newbook',
                        {
                            bookObj: {
                                userId,
                                userEmail,
                                name: title,
                                author,
                                category,
                                publisher,
                                isbn: ISBN,
                                year,
                                edition,
                                reviews: [],
                            },
                        }
                    );
                }

                // After adding all books, fetch books from the backend
                fetchBooksFromDB();
            } else {
                console.error('Error adding books from file:', error);
            }
        } catch (error) {
            // Handle error
            console.error('Error adding books from file:', error);
        }
    };

    const fetchBooksFromDB = async () => {
        try {
            setLoading(true);

            // Fetch data from the database
            const response = await axios.get(
                'http://localhost:3001/api/books/getall'
            );
            const books = response.data;
            console.log(books);
            // If the database has no books, fetch data from the file
            if (books.length === 0) {
                const fileResponse = await axios.get(
                    'http://localhost:3001/api/books/filedata'
                );
                const fileBooks = fileResponse.data;

                // Assuming fileBooks is an array of books from the file
                setMyRows([...fileBooks]);

                // Add books to the database
                await addBooksToDB(fileBooks);
            } else {
                // Database has books, use them
                setMyRows([...books]);
            }
        } catch (error) {
            // Handle error
            console.error('Error fetching books:', error);
        } finally {
            setLoading(false);
        }
    };

    const resetBookState = () => {
        setName('');
        setAuthor('');
        setCategory('');
        setPublisher('');
        setIsbn('');
        setYear('');
        setEdition('');
    };

    const closeSnackBar = () => {
        handleSnackBar(false);
        handleIsAdded(false);
        handleReviewAdded(false);
        setBlankEntry(false);
        setIsDeleted(false);
    };
    const action = (
        <React.Fragment>
            <IconButton
                size='small'
                aria-label='close'
                color='inherit'
                onClick={closeSnackBar}
                autoHideDuration={4000}
            >
                <CloseIcon fontSize='small' />
            </IconButton>
        </React.Fragment>
    );

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    };

    //Check if publishing year is a four digit number
    const handleYearChange = (event) => {
        const value = event.target.value;
        setYear(value);

        if (value.length === 4 && !isNaN(value)) {
            setError(false);
        } else {
            setError(true);
        }
    };

    // books table sort
    const handleSort = (columnName, order) => {
        if (columnName === 'title') {
            const sortedRows = orderBy(myRows, ['title'], [order]);
            setMyRows(sortedRows);
        } else if (columnName === 'author') {
            const sortedRows = orderBy(myRows, ['author'], [order]);
            setMyRows(sortedRows);
        } else if (columnName === 'category') {
            const sortedRows = orderBy(myRows, ['category'], [order]);
            setMyRows(sortedRows);
        } else if (columnName === 'publisher') {
            const sortedRows = orderBy(myRows, ['publisher'], [order]);
            setMyRows(sortedRows);
        } else if (columnName === 'year') {
            const sortedRows = orderBy(myRows, ['year'], [order]);
            setMyRows(sortedRows);
        } else if (columnName === 'ISBN') {
            const sortedRows = orderBy(myRows, ['ISBN'], [order]);
            setMyRows(sortedRows);
        } else if (columnName === 'edition') {
            const sortedRows = orderBy(myRows, ['edition'], [order]);
            setMyRows(sortedRows);
        }
    };

    //Check if ISBN is valid
    const handleISBNChange = (event) => {
        const value = event.target.value;
        setIsbn(value);

        if (ISBN.Validate(value)) {
            setError(false);
        } else {
            setError(true);
        }
    };

    //adds the review for each book
    const handleBookReview = () => {
        const updatedRows = myRows.map((book) => {
            if (book.name === bookName) {
                return {
                    ...book,
                    reviews: [
                        ...book.reviews,
                        { starRating: rating, textReview: bookReview },
                    ],
                };
            } else {
                return { ...book };
            }
        });
        setMyRows([...updatedRows]);
        handleReviewAdded(true);
        setBookReview('');
        setRating(0);
    };

    const onPointerMove = (value, index) => {
        setRating(value);
    };

    const starGenerator = (count) => {
        const stars = [];
        for (let i = 1; i <= count; i++) {
            stars.push(<StarIcon color='warning' />);
        }
        return stars;
    };

    React.useEffect(() => {
        const filteredRow = () => {
            if (filter) {
                //searching can be improved
                const newRow = myRows.filter(
                    (row) =>
                        (filter && row.title.includes(filter)) ||
                        (row.category && row.category.includes(filter)) ||
                        row.author.includes(filter)
                );

                if (newRow.length > 0) {
                    setMyRows(newRow);
                } else {
                    setMyRows(myRows);
                }
            } else {
                setMyRows(myRows);
            }
        };
        filteredRow();
        return () => {
            setMyRows([]);
            setFilter('');
        };
    }, [filter, setFilter, myRows]);

    useEffect(() => {
        fetchBooksFromDB();
    }, []);

    // open hidden content when ellipsis icon is clicked
    const handleShowMore = (index) => {
        setVisibleContent((prevIndex) => (prevIndex === index ? -1 : index));
    };

    return (
        <>
            <Snackbar
                action={action}
                open={isDeleted}
                autoHideDuration={3000}
                onClose={closeSnackBar}
                message={removedItemName}
            />
            <Snackbar
                action={action}
                open={isAdded}
                autoHideDuration={3000}
                onClose={closeSnackBar}
                message='Item Added Successfully'
            />
            <Snackbar
                action={action}
                open={blankEntry}
                autoHideDuration={3000}
                onClose={closeSnackBar}
                message='Please enter the required credentials'
            />
            <Snackbar
                action={action}
                open={showSnackBar}
                autoHideDuration={3000}
                onClose={closeSnackBar}
                message={bookUploadError}
            />
            {/* //book review modal start// */}
            <Modal
                open={showReviewModal}
                onClose={() => {
                    handleReviewModal(false);
                }}
            >
                <Box sx={style}>
                    <Typography
                        id='modal-modal-title'
                        variant='h6'
                        component='h2'
                    >
                        {t('modal.review.title')} {bookName}
                    </Typography>

                    <Rating
                        onPointerMove={onPointerMove}
                        initialValue={rating}
                    />

                    <TextField
                        id='outlined-multiline-static'
                        multiline
                        rows={4}
                        size='medium'
                        type='string'
                        value={bookReview}
                        inputProps={{ maxLength: 150 }}
                        placeholder={t('modal.review.placeholder')}
                        onChange={(e) => {
                            setBookReview(e.target.value);
                        }}
                    />

                    {isReviewAdded ? (
                        <>
                            <Button
                                variant='contained'
                                color='warning'
                                style={{ marginTop: '10px' }}
                                onClick={() => {
                                    handleReviewModal(false);
                                    handleReviewAdded(false);
                                }}
                            >
                                {t('home.buttons.closeModal')}
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                type='submit'
                                variant='contained'
                                color='success'
                                style={{ marginTop: '10px' }}
                                onClick={() => {
                                    handleBookReview();
                                }}
                            >
                                {t('modal.review.addReview')}
                            </Button>
                        </>
                    )}
                </Box>
            </Modal>
            {/* //book review modal end// //book read review modal start// */}
            <div>
                <Dialog
                    open={enableReviewModal}
                    onClose={() => {
                        setEnableReviewModal(false);
                    }}
                    aria-labelledby='alert-dialog-title'
                    aria-describedby='alert-dialog-description'
                >
                    <DialogTitle align='center' id='alert-dialog-title'>
                        {t('modal.review.readReview')} {book?.title}
                    </DialogTitle>

                    <DialogContent dividers>
                        <DialogContentText id='alert-dialog-description'>
                            {book?.reviews?.length > 0 ? (
                                book?.reviews?.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            {starGenerator(item?.starRating)}
                                            <Typography
                                                key={index}
                                                variant='h6'
                                            >
                                                {item?.textReview}
                                            </Typography>
                                        </div>
                                    );
                                })
                            ) : (
                                <Typography variant='p'>
                                    {t('modal.review.noReview')}{' '}
                                    <strong>{book?.title}</strong>
                                </Typography>
                            )}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => {
                                setEnableReviewModal(false);
                            }}
                            autoFocus
                        >
                            {t('home.buttons.close')}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            {/* //book read reviews modal end// */}
            <Modal
                open={showModal}
                onClose={() => {
                    handleModalBox(false);
                }}
            >
                <Box sx={style}>
                    <Typography
                        id='modal-modal-title'
                        variant='h6'
                        component='h2'
                    >
                        {t('home.headings.item')}
                    </Typography>
                    <form
                        onSubmit={(e) => {
                            addItemToTable(e);
                        }}
                    >
                        <TextField
                            label={t('modal.labels.book')}
                            fullWidth
                            style={{ marginTop: '10px' }}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            defaultValue=''
                        />
                        <TextField
                            label={t('modal.labels.author')}
                            onChange={(e) => {
                                setAuthor(e.target.value);
                            }}
                            fullWidth
                            style={{ marginTop: '10px' }}
                        />
                        <TextField
                            label={t('modal.labels.category')}
                            onChange={(e) => {
                                setCategory(e.target.value);
                            }}
                            fullWidth
                            style={{ marginTop: '10px' }}
                        />
                        <TextField
                            label={t('modal.labels.publisher')}
                            onChange={(e) => {
                                setPublisher(e.target.value);
                            }}
                            fullWidth
                            style={{ marginTop: '10px' }}
                        />
                        <TextField
                            label={t('modal.labels.isbn')}
                            onChange={handleISBNChange}
                            error={error}
                            helperText={
                                error ? t('modal.errors.invalidISBN') : ''
                            }
                            fullWidth
                            style={{ marginTop: '10px' }}
                        />
                        <TextField
                            label={t('modal.labels.year')}
                            onChange={handleYearChange}
                            fullWidth
                            style={{ marginTop: '10px' }}
                            error={error}
                            helperText={
                                error ? t('modal.errors.invalidYear') : ''
                            }
                        />
                        <TextField
                            label={t('modal.labels.edition')}
                            onChange={(e) => {
                                setEdition(e.target.value);
                            }}
                            fullWidth
                            style={{ marginTop: '10px' }}
                        />
                        {isAdded ? (
                            <>
                                <Button
                                    variant='contained'
                                    color='warning'
                                    style={{ marginTop: '10px' }}
                                    onClick={() => {
                                        handleModalBox(false);
                                    }}
                                >
                                    {t('home.buttons.closeModal')}
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    type='submit'
                                    variant='contained'
                                    color='success'
                                    style={{ marginTop: '10px' }}
                                >
                                    {loading && (
                                        <CircularProgress
                                            size={15}
                                            sx={{ mr: '10px' }}
                                            color='inherit'
                                        />
                                    )}
                                    {t('home.buttons.add')}
                                </Button>
                            </>
                        )}
                    </form>
                </Box>
            </Modal>
            {myRows.length > 0 ? (
                <TableContainer
                    style={{ marginTop: 80, marginInline: 10 }}
                    component={Paper}
                >
                    <Table
                        sx={{ minWidth: 750 }}
                        size='medium'
                        aria-label='simple table'
                        style={{ marginLeft: 20 }}
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    {t('home.headings.action')}
                                </TableCell>
                                <TableCell align='center'>
                                    <TableSortLabel
                                        active={true}
                                        direction={
                                            sortingColumn === 'title' &&
                                            sortOrder
                                                ? 'desc'
                                                : 'asc'
                                        }
                                        onClick={() => {
                                            setSortOrder(!sortOrder);
                                            setSortingColumn('title');
                                            handleSort(
                                                'title',
                                                sortOrder ? 'asc' : 'desc'
                                            );
                                        }}
                                    >
                                        {t('home.headings.title')}
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align='center'>
                                    <TableSortLabel
                                        active={true}
                                        direction={
                                            sortingColumn === 'author' &&
                                            sortOrder
                                                ? 'desc'
                                                : 'asc'
                                        }
                                        onClick={() => {
                                            setSortOrder(!sortOrder);
                                            setSortingColumn('author');
                                            handleSort(
                                                'author',
                                                sortOrder ? 'asc' : 'desc'
                                            );
                                        }}
                                    >
                                        {t('home.headings.author')}
                                    </TableSortLabel>{' '}
                                </TableCell>
                                <TableCell align='center'>
                                    {' '}
                                    <TableSortLabel
                                        active={true}
                                        direction={
                                            sortingColumn === 'category' &&
                                            sortOrder
                                                ? 'desc'
                                                : 'asc'
                                        }
                                        onClick={() => {
                                            setSortOrder(!sortOrder);
                                            setSortingColumn('category');
                                            handleSort(
                                                'category',
                                                sortOrder ? 'asc' : 'desc'
                                            );
                                        }}
                                    >
                                        {t('home.headings.category')}
                                    </TableSortLabel>{' '}
                                </TableCell>
                                <TableCell align='center'>
                                    {' '}
                                    <TableSortLabel
                                        active={true}
                                        direction={
                                            sortingColumn === 'publisher' &&
                                            sortOrder
                                                ? 'desc'
                                                : 'asc'
                                        }
                                        onClick={() => {
                                            setSortOrder(!sortOrder);
                                            setSortingColumn('publisher');
                                            handleSort(
                                                'publisher',
                                                sortOrder ? 'asc' : 'desc'
                                            );
                                        }}
                                    >
                                        {t('home.headings.publisher')}
                                    </TableSortLabel>{' '}
                                </TableCell>
                                <TableCell align='center'>
                                    {' '}
                                    <TableSortLabel
                                        active={true}
                                        direction={
                                            sortingColumn === 'ISBN' &&
                                            sortOrder
                                                ? 'desc'
                                                : 'asc'
                                        }
                                        onClick={() => {
                                            setSortOrder(!sortOrder);
                                            setSortingColumn('ISBN');
                                            handleSort(
                                                'ISBN',
                                                sortOrder ? 'asc' : 'desc'
                                            );
                                        }}
                                    >
                                        {t('home.headings.isbn')}
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align='center'>
                                    {' '}
                                    <TableSortLabel
                                        active={true}
                                        direction={
                                            sortingColumn === 'year' &&
                                            sortOrder
                                                ? 'desc'
                                                : 'asc'
                                        }
                                        onClick={() => {
                                            setSortOrder(!sortOrder);
                                            setSortingColumn('year');
                                            handleSort(
                                                'year',
                                                sortOrder ? 'asc' : 'desc'
                                            );
                                        }}
                                    >
                                        {t('home.headings.year')}
                                    </TableSortLabel>{' '}
                                </TableCell>
                                <TableCell align='center'>
                                    <TableSortLabel
                                        active={true}
                                        direction={
                                            sortingColumn === 'edition' &&
                                            sortOrder
                                                ? 'desc'
                                                : 'asc'
                                        }
                                        onClick={() => {
                                            setSortOrder(!sortOrder);
                                            setSortingColumn('edition');
                                            handleSort(
                                                'edition',
                                                sortOrder ? 'asc' : 'desc'
                                            );
                                        }}
                                    >
                                        {t('home.headings.edition')}
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align='center'>
                                    {t('home.headings.review')}
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow className='Add-book-button-container'>
                                <TableCell sx={{ border: 0 }}>
                                    <Button
                                        variant='contained'
                                        sx={{
                                            borderRadius: '50%',
                                            height: '60px',
                                        }}
                                    >
                                        <AddIcon
                                            className={Classes.tableactionicon}
                                            onClick={() => {
                                                handleModalBox(true);
                                            }}
                                        />
                                    </Button>
                                </TableCell>
                            </TableRow>
                            {myRows.map((row, idx) => (
                                <TableRow
                                    key={row.title}
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        },
                                    }}
                                >
                                    {userId === row.userId ? (
                                        <TableCell
                                            className={Classes.actions}
                                            sx={{
                                                position: 'relative',
                                            }}
                                        >
                                            <div
                                                className='more-container'
                                                onClick={() =>
                                                    handleShowMore(idx)
                                                }
                                            >
                                                <Box className='more-horiz-icon'>
                                                    <MoreHorizIcon />
                                                </Box>
                                                <span className='more-span'>
                                                    {t('home.more')}
                                                </span>
                                            </div>
                                            <Box
                                                position={style.position}
                                                sx={{
                                                    bottom: '20px',
                                                    width: '200px',
                                                    backgroundColor:
                                                        style.bgcolor,
                                                    display:
                                                        visibleContent === idx
                                                            ? 'block'
                                                            : 'none',
                                                    borderRadius: '5px',
                                                    padding: '5px',
                                                    border: '1px solid #222',
                                                    zIndex: 1,
                                                }}
                                            >
                                                <Typography
                                                    borderBottom='1px solid #333'
                                                    fontSize='10px'
                                                    marginBottom='10px'
                                                    display={style.display}
                                                    alignItems={
                                                        style.alignItems
                                                    }
                                                    sx={{
                                                        '&:hover': {
                                                            color: '#b3cfff',
                                                            cursor: 'pointer',
                                                        },
                                                    }}
                                                    onClick={() =>
                                                        setVisibleContent(-1)
                                                    }
                                                >
                                                    {t('home.buttons.close')}
                                                    <CloseIcon
                                                        sx={{
                                                            fontSize: '14px',
                                                            marginLeft: '5px',
                                                        }}
                                                    />
                                                </Typography>
                                                <Typography
                                                    display={style.display}
                                                    alignItems={
                                                        style.alignItems
                                                    }
                                                    justifyContent={
                                                        style.justifyContent
                                                    }
                                                    fontSize='14px'
                                                    sx={{
                                                        '&:hover': {
                                                            color: '#b3cfff',
                                                            cursor: 'pointer',
                                                        },
                                                    }}
                                                    onClick={(e) => {
                                                        removeBookByName(row);
                                                    }}
                                                >
                                                    {t('home.buttons.delete')}
                                                    {loading ? (
                                                        <CircularProgress
                                                            size={16}
                                                        />
                                                    ) : (
                                                        <DeleteIcon
                                                            sx={{
                                                                fontSize:
                                                                    '16px',
                                                            }}
                                                        />
                                                    )}
                                                </Typography>
                                                <Typography
                                                    display={style.display}
                                                    alignItems={
                                                        style.alignItems
                                                    }
                                                    justifyContent={
                                                        style.justifyContent
                                                    }
                                                    fontSize='14px'
                                                    sx={{
                                                        '&:hover': {
                                                            color: '#b3cfff',
                                                            cursor: 'pointer',
                                                        },
                                                    }}
                                                >
                                                    {t('home.buttons.edit')}
                                                    <EditIcon
                                                        sx={{
                                                            fontSize: '16px',
                                                        }}
                                                    />
                                                </Typography>
                                                <Typography
                                                    display={style.display}
                                                    alignItems={
                                                        style.alignItems
                                                    }
                                                    justifyContent={
                                                        style.justifyContent
                                                    }
                                                    fontSize='14px'
                                                    sx={{
                                                        '&:hover': {
                                                            color: '#b3cfff',
                                                            cursor: 'pointer',
                                                        },
                                                    }}
                                                >
                                                    {t('home.buttons.share')}
                                                    <ShareIcon
                                                        sx={{
                                                            fontSize: '16px',
                                                        }}
                                                    />
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                    ) : (
                                        <TableCell></TableCell>
                                    )}
                                    <TableCell
                                        component='th'
                                        scope='row'
                                        align='center'
                                    >
                                        {row.title}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {row.author}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {row.category}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {row.publisher}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {row.ISBN}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {row.year}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {row.edition + ' Edition'}
                                    </TableCell>
                                    <TableCell align='center'>
                                        <Button
                                            type='submit'
                                            variant='contained'
                                            color='primary'
                                            style={{ width: '80px' }}
                                            onClick={() => {
                                                setBookName(row.title);
                                                handleReviewModal(true);
                                            }}
                                        >
                                            {t('home.buttons.review')}
                                        </Button>
                                        <Button
                                            type='submit'
                                            variant='contained'
                                            color='success'
                                            style={{
                                                marginLeft: '10px',
                                                width: '80px',
                                            }}
                                            onClick={() => {
                                                setBook(row);
                                                setEnableReviewModal(true);
                                            }}
                                        >
                                            {t('home.buttons.read')}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <div className='skeleton'>
                    <CircularProgress />
                </div>
            )}
        </>
    );
}

Library.propTypes = {
    filter: PropTypes.string,
    setFilter: PropTypes.func,
};
