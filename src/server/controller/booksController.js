const Book = require('../model/booksModel');
const User = require('../model/userModel');

module.exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports.newBook = async (req, res) => {
    const {bookObj } = {...req.body};
    const { name, author, category, publisher, isbn, year, edition, userEmail } = {...bookObj};

    try {
        //Check if book already exist in db
        const existingBook = await Book.findOne({title:name});
        if(existingBook){
            return res.status(400).json({
                message:
                    'Book already exist in db',
            });
        }
        //Find user in db to use 
        const existinguser = await User.findOne({ email:userEmail });
        const book = new Book({
            userId:existinguser._id,
            title: name,
            author: author,
            category: category,
            year: year,
            publisher,
            ISBN: isbn,
            edition,
        });
        await book.save();
        res.status(200).json({
            message: 'Book added successfully',
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports.deleteBook = async (req, res) => {
    const {bookId, userId, userEmail} = {...req.body};

    try {
        // get current user from db
        const currentUser = await User.findOne({email:userEmail});

            //find book
        const book = await Book.findOne({_id:bookId});
        console.log(currentUser._id.equals(book.userId));
        //check if book to be deleted is owned by current user
        if(!currentUser._id.equals(book.userId)){
        return res.status(400).json({
            message:
                'Book can only be deleted by owner',
        });
     }

        //delete book since it is owned by the current user
        await book.deleteOne();
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
    
    
}
