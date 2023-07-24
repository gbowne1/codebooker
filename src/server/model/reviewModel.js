const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    // For now author is commented because there is no still login in this project so it is difficult to manipulate the data
    // author: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // },
    description: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
