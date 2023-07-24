const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String },
    publisher: { type: String },
    rating: { type: Number },
    ISBN: { type: Number, unique: true },
    edition: { type: Number },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    createdAt: { type: Date, default: Date.now },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
