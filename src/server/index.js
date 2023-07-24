// Common Importing Statements
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');

// routes
const userRoutes = require('./routes/userRoutes');
const booksRoutes = require('./routes/booksRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

// initilizing
dotenv.config();
const app = express();
app.use(express.json({ extended: true }))
    .use(express.urlencoded({ extended: true }))
    .use(cors())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }));

// db connection
mongoose
    .connect(process.env.MONGO_DB)
    .then(() => {
        console.log('Db connection open');
    })
    .catch((err) => {
        console.log(err.message, 'oops err');
    });

// default route
app.get('/api/', (req, res) => {
    res.send('Backend Server Up');
});

// routes for user
app.use('/api/user', userRoutes);

// routes for books
app.use('/api/books', booksRoutes);

// routes for review
app.use('/api/review', reviewRoutes);

app.use('/api/*', (req, res) => {
    res.send('404 No routes found');
});

// listening port
// port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running at Port ${PORT}`);
});
