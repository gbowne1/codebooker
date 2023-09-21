const mongoose = require('mongoose');

const supportSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    description: {
        type: String,
        unique: true,
        required: true,
    },
    status: {
        type: String,
        enum: ['Open', 'In Progress', 'Resolved'],
        default: 'Open',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const Support = mongoose.model('Support', supportSchema);
module.exports = Support;
