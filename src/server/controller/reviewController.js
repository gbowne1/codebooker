const Book = require('../model/booksModel');
const Review = require('../model/reviewModel');

module.exports.newReview = async (req, res) => {
    const { description, rating, id } = req.body;

    try {
        const book = await Book.findById(id);
        if (book) {
            const newreview = new Review({ description, rating });
            book.reviews.push(newreview);
            await newreview.save();
            await book.save();
            res.status(200).json(book);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};
