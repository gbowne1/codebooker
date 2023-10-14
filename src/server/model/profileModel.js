const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    profile_pricture: {
        type: String,
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
    education:[
        {
            school:{
                type: String,
            },
            degree:{
                type: String,
            },
            fieldofstudy:{
                type: String,
            },
            from:{
                type: Date,
            },
            to:{
                type: Date,
            },
            current:{
                type: Boolean,
                default: false,
            },
            description:{
                type: String,
            },
        }
    ],
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
    socials: {
        youtube:{
            type: String,
        },
        twitter:{
            type: String,
        },
        linkedin:{
            type: String,
        },
        github: {
            type: String,
        },
        gitlab: {
            type: String,
        },
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;