import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
/* import { TableVirtuoso } from 'react-virtuoso'; */
import './Library.css';
import Classes from './Library.module.css';
import rows from './data.json';
import { Button, Modal, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
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

export default function Library() {
	const [myRows, setMyRows] = useState(rows);
	const [showSnackBar, handleSnackBar] = useState(false);
	const [removedItemName, setRemovedItemName] = useState('');

	//Modal states
	const [showModal, handleModalBox] = useState(false);
	const [name, setName] = useState('');
	const [author, setAuthor] = useState('');
	const [publisher, setPublisher] = useState('');
	const [isbn, setIsbn] = useState('');
	const [year, setYear] = useState('');
	const [edition, setEdition] = useState('');
	const [error, setError] = useState(false);

	//Book review modal states
	const [showReviewModal, handleReviewModal] = useState(false);
	const [isReviewAdded, handleReviewAdded] = useState(false);
	const [bookName, setBookName] = useState('');
	const [bookReview, setBookReview] = useState('');
	const [rating, setRating] = useState(0);

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

		console.log(name, author, publisher, isbn, year, edition);
		let bookObj = { name, author, publisher, isbn, year, edition, reviews: [] };
		setMyRows([...myRows, bookObj]);
		handleIsAdded(true);
	};

	const closeSnackBar = () => {
		handleSnackBar(false);
		handleIsAdded(false);
		handleReviewAdded(false);
	};
	const action = (
		<React.Fragment>
			<IconButton
				size='small'
				aria-label='close'
				color='inherit'
				onClick={closeSnackBar}
				autoHideDuration={4000}>
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

	return (
		<>
			<Snackbar
				action={action}
				open={showSnackBar}
				onClose={closeSnackBar}
				message={removedItemName}
			/>
			<Snackbar
				action={action}
				open={isAdded}
				onClose={closeSnackBar}
				message='Item Added Successfully'
			/>
			<Snackbar
				action={action}
				open={isReviewAdded}
				onClose={closeSnackBar}
				message='Review Added Successfully'
			/>
			//book review modal start//
			<Modal
				open={showReviewModal}
				onClose={() => {
					handleReviewModal(false);
				}}>
				<Box sx={style}>
					<Typography id='modal-modal-title' variant='h6' component='h2'>
						Review for {bookName}
					</Typography>

					<Rating onPointerMove={onPointerMove} initialValue={rating} />

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
								}}>
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
								}}>
								Add Review
							</Button>
						</>
					)}
				</Box>
			</Modal>
			//book review modal end//
			<Modal
				open={showModal}
				onClose={() => {
					handleModalBox(false);
				}}>
				<Box sx={style}>
					<Typography id='modal-modal-title' variant='h6' component='h2'>
						Add Item to table
					</Typography>
					<form
						onSubmit={(e) => {
							addItemToTable(e);
						}}>
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
							helperText={error ? 'Please enter a valid ISBN' : ''}
							fullWidth
							style={{ marginTop: '10px' }}
						/>
						<TextField
							label='Year Published'
							onChange={handleYearChange}
							fullWidth
							style={{ marginTop: '10px' }}
							error={error}
							helperText={error ? 'Please enter a valid year' : ''}
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
									}}>
									Close Modal
								</Button>
							</>
						) : (
							<>
								<Button
									type='submit'
									variant='contained'
									color='success'
									style={{ marginTop: '10px' }}>
									Add Book
								</Button>
							</>
						)}
					</form>
				</Box>
			</Modal>
			<TableContainer style={{ marginTop: 80 }} component={Paper}>
				<Table
					sx={{ minWidth: 750 }}
					size='medium'
					aria-label='simple table'
					style={{ marginLeft: 20 }}>
					<TableHead>
						<TableRow>
							<TableCell>Action</TableCell>
							<TableCell>Title</TableCell>
							<TableCell align='center'>Author</TableCell>
							<TableCell align='center'>Category</TableCell>
							<TableCell align='center'>Publisher</TableCell>
							<TableCell align='center'>ISBN</TableCell>
							<TableCell align='center'>Year</TableCell>
							<TableCell align='center'>Edition</TableCell>
							<TableCell align='center'>Review</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{myRows.map((row) => (
							<TableRow
								key={row.name}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
								<TableCell className={Classes.actions}>
									{myRows.indexOf(row) === myRows.length - 1 ? (
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
								<TableCell component='th' scope='row'>
									{row.name}
								</TableCell>
								<TableCell align='center'>{row.author}</TableCell>
								<TableCell align='center'>{row.category}</TableCell>
								<TableCell align='center'>{row.publisher}</TableCell>
								<TableCell align='center'>{row.isbn}</TableCell>
								<TableCell align='center'>{row.year}</TableCell>
								<TableCell align='center'>{row.edition}</TableCell>
								<TableCell align='center'>
									<Button
										type='submit'
										variant='contained'
										color='primary'
										style={{ width: '80px' }}
										onClick={() => {
											setBookName(row.name);
											handleReviewModal(true);
										}}>
										Review Book
									</Button>
									<Button
										type='submit'
										variant='contained'
										color='success'
										style={{ marginLeft: '10px', width: '80px' }}>
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
