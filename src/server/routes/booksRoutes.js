const express = require('express');
const router = express.Router();

const {
    getAllBooks,
    newBook,
    deleteBook,
    getAllFromFile,
    addBookToGlobalLibrary,
} = require('../controller/booksController');
const { get } = require('lodash');

router.get('/getall', getAllBooks);
router.post('/newbook', newBook);
router.post('/add-book-to-global-library', addBookToGlobalLibrary);
router.delete('/:id', deleteBook);
router.get('/filedata', getAllFromFile);

module.exports = router;
