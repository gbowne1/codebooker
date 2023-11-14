const express = require('express');
const router = express.Router();

const {
    getAllBooks,
    newBook,
    deleteBook,
    getAllFromFile,
} = require('../controller/booksController');
const { get } = require('lodash');

router.get('/getall', getAllBooks);
router.post('/newbook', newBook);
router.delete('/:id', deleteBook);
router.get('/filedata', getAllFromFile);

module.exports = router;
