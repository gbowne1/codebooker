const express = require('express');
const router = express.Router();

const { getAllBooks, newBook } = require('../controller/booksController');

router.get('/getall', getAllBooks);
router.post('/newbook', newBook);

module.exports = router;
