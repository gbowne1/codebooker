const express = require('express');
const router = express.Router();

const { getAllBooks, newBook, deleteBook } = require('../controller/booksController');

router.get('/getall', getAllBooks);
router.post('/newbook', newBook);
router.delete('/:id', deleteBook);

module.exports = router;
