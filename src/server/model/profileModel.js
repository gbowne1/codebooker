const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    email: {
        type: String,
        required: true,
        unique: true,
        ref: 'User',
    },
    profile_picture: {
        type: String,
    },
    bio:{
        type:String,
        required: true,
    },
    name:{
        type:String,
        required: true,
    },
    alias:{
        type: String,
        required: true,
        unique:true
    },
    location:{
        type: String,
    },
    city:{
        type: String,
    },
    education:{
        type: String,
    },
    age: {
        type: Number,
        default: null,
        required: true,
    },
    display_age: {
        type: Boolean,
    },
    occupation:{
        type: String,
    },
    skills:{
        type: String,
    },
    text_editor: {
        type: String,
    },
    operating_system: {
        type: String,
    },
    portfolio_link: {
        type: String,
    },
    youtube:{
        type: String,
    },
    twitter:{
        type: String,
    },
    linkedIn:{
        type: String,
    },
    github: {
        type: String,
    },
    gitlab: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;