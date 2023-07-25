const Book = require('../model/booksModel');

module.exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().populate('reviews');
        res.status(200).json(books);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports.newBook = async (req, res) => {
    const { title, author, category, publisher, ISBN, description, edition } =
        req.body;

    try {
        const book = new Book({
            title,
            author,
            publisher,
            ISBN,
            description,
            edition,
        });
        await book.save();
        res.status(200).json(book);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};
