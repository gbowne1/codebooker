import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { orderBy } from 'lodash';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
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
import RemoveIcon from '@mui/icons-material/Remove';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
/* import { TableVirtuoso } from 'react-virtuoso'; */
import './Library.css';
import Classes from './Library.module.css';
import rows from './data.json';
import { Button, Modal, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import ISBN from 'isbn-validate';
import { Rating } from 'react-simple-star-rating';
// function createData(name, calories, fat, carbs, protein) {
// 	return { name, calories, fat, carbs, protein };
// }

// const rows = [
// 	createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
// 	createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
// 	createData('Eclair', 262, 16.0, 24, 6.0),
// 	createData('Cupcake', 305, 3.7, 67, 4.3),
// 	createData('Gingerbread', 356, 16.0, 49, 3.9),

// ];

export default function Library({ filter }) {
    const [myRows, setMyRows] = useState(rows);
    const [showSnackBar, handleSnackBar] = useState(false);
    const [removedItemName, setRemovedItemName] = useState('');

    //table sorting states
    const [sortOrder, setSortOrder] = useState(false);
    const [sortingColumn, setSortingColumn] = useState('');

    //Modal states
    const [showModal, handleModalBox] = useState(false);
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
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

    //This state helps us for two way in input filed
    const [isAdded, handleIsAdded] = useState(false);
    const removeBookByName = (row) => {
        setRemovedItemName('removed ' + row.name + ' successfully');
        myRows.splice(myRows.indexOf(row), 1);

        setMyRows([...myRows]);
        handleSnackBar(true);
    };
    const addItemToTable = (e) => {
        e.preventDefault();
        if (name && author && publisher && isbn && year && edition) {
            let bookObj = {
                name,
                author,
                publisher,
                isbn,
                year,
                edition,
                reviews: [],
            };
            setMyRows([...myRows, bookObj]);

            handleIsAdded(true);
            resetBookState();
            handleModalBox(false);
        } else {
            setBlankEntry(true);
        }
        console.log(name, author, publisher, isbn, year, edition);
    };

    const resetBookState = () => {
        setName('');
        setAuthor('');
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
            const sortedRows = orderBy(myRows, ['name'], [order]);
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
        } else if (columnName === 'isbn') {
            const sortedRows = orderBy(myRows, ['isbn'], [order]);
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
            } else if (book.name !== bookName) {
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
                const newRow = rows.filter(
                    (row) =>
                        (filter && row.name.includes(filter)) ||
                        (row.category && row.category.includes(filter)) ||
                        row.author.includes(filter)
                );

                if (newRow.length > 0) {
                    setMyRows(newRow);
                } else {
                    setMyRows(rows);
                }
            } else {
                setMyRows(rows);
            }
        };

        filteredRow();
    }, [filter]);

    return (
        <>
            <Snackbar
                action={action}
                open={showSnackBar}
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
                        Review for {bookName}
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
                        placeholder='type your review here...'
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
                                Close Modal
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
                                Add Review
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
                        Reading reviews of {book?.name}
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
                                    There are no reviews yet for{' '}
                                    <strong>{book?.name}</strong>
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
                            Close
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
                        Add Item to table
                    </Typography>
                    <form
                        onSubmit={(e) => {
                            addItemToTable(e);
                        }}
                    >
                        <TextField
                            label='Enter Book Name'
                            fullWidth
                            style={{ marginTop: '10px' }}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            defaultValue=''
                        />
                        <TextField
                            label='Enter Author Name'
                            onChange={(e) => {
                                setAuthor(e.target.value);
                            }}
                            fullWidth
                            style={{ marginTop: '10px' }}
                        />
                        <TextField
                            label='Enter Category'
                            onChange={(e) => {
                                setAuthor(e.target.value);
                            }}
                            fullWidth
                            style={{ marginTop: '10px' }}
                        />
                        <TextField
                            label='Who is the publisher'
                            onChange={(e) => {
                                setPublisher(e.target.value);
                            }}
                            fullWidth
                            style={{ marginTop: '10px' }}
                        />
                        <TextField
                            label='ISBN'
                            onChange={handleISBNChange}
                            error={error}
                            helperText={
                                error ? 'Please enter a valid ISBN' : ''
                            }
                            fullWidth
                            style={{ marginTop: '10px' }}
                        />
                        <TextField
                            label='Year Published'
                            onChange={handleYearChange}
                            fullWidth
                            style={{ marginTop: '10px' }}
                            error={error}
                            helperText={
                                error ? 'Please enter a valid year' : ''
                            }
                        />
                        <TextField
                            label='Edition'
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
                                    Close Modal
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
                                    Add Book
                                </Button>
                            </>
                        )}
                    </form>
                </Box>
            </Modal>
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
                            <TableCell>Action</TableCell>
                            <TableCell align='center'>
                                <TableSortLabel
                                    active={true}
                                    direction={
                                        sortingColumn === 'title' && sortOrder
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
                                    Title
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align='center'>
                                <TableSortLabel
                                    active={true}
                                    direction={
                                        sortingColumn === 'author' && sortOrder
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
                                    Author
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
                                    Category
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
                                    Publisher
                                </TableSortLabel>{' '}
                            </TableCell>
                            <TableCell align='center'>
                                {' '}
                                <TableSortLabel
                                    active={true}
                                    direction={
                                        sortingColumn === 'isbn' && sortOrder
                                            ? 'desc'
                                            : 'asc'
                                    }
                                    onClick={() => {
                                        setSortOrder(!sortOrder);
                                        setSortingColumn('isbn');
                                        handleSort(
                                            'isbn',
                                            sortOrder ? 'asc' : 'desc'
                                        );
                                    }}
                                >
                                    ISBN
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align='center'>
                                {' '}
                                <TableSortLabel
                                    active={true}
                                    direction={
                                        sortingColumn === 'year' && sortOrder
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
                                    Year
                                </TableSortLabel>{' '}
                            </TableCell>
                            <TableCell align='center'>
                                <TableSortLabel
                                    active={true}
                                    direction={
                                        sortingColumn === 'edition' && sortOrder
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
                                    Edition
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align='center'>Review</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {myRows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell className={Classes.actions}>
                                    {myRows.indexOf(row) ===
                                    myRows.length - 1 ? (
                                        <AddIcon
                                            className={Classes.tableactionicon}
                                            onClick={() => {
                                                handleModalBox(true);
                                            }}
                                        />
                                    ) : (
                                        <></>
                                    )}

                                    <RemoveIcon
                                        className={Classes.tableactionicon}
                                        onClick={(e) => {
                                            removeBookByName(row);
                                        }}
                                    />
                                </TableCell>
                                <TableCell
                                    component='th'
                                    scope='row'
                                    align='center'
                                >
                                    {row.name}
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
                                <TableCell align='center'>{row.isbn}</TableCell>
                                <TableCell align='center'>{row.year}</TableCell>
                                <TableCell align='center'>
                                    {row.edition}
                                </TableCell>
                                <TableCell align='center'>
                                    <Button
                                        type='submit'
                                        variant='contained'
                                        color='primary'
                                        style={{ width: '80px' }}
                                        onClick={() => {
                                            setBookName(row.name);
                                            handleReviewModal(true);
                                        }}
                                    >
                                        Review Book
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
                                        {' '}
                                        Read Reviews
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

Library.propTypes = {
    filter: PropTypes.string,
};
