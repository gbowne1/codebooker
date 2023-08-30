const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    rating: { type: Number, required: true },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    feedback: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const FeedBack = mongoose.model('FeedBack', feedbackSchema);

module.exports = FeedBack;
