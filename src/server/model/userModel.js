const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    created_on: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', userSchema);
