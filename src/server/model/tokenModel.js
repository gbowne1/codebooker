const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    token: {
        type: String,
        required: true,
    },

    created_on: {
        type: Date,
        required: true,
    },
    expires_in: {
        type: Date,
        required: true,
        index: { expires: '1s' },
    },
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
