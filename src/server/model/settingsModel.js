const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    push_notification: {
        new_book_release: {
            type: Boolean,
            default: false,
        },
        book_recommendation: {
            type: Boolean,
            default: false,
        },
        book_review_update: {
            type: Boolean,
            default: false,
        }
    },
    email_notification: {
        codebooker_updates: {
            type: Boolean,
            default: false,
        },
        tips: {
            type: Boolean,
            default: false,
        },
        suggestions: {
            type: Boolean,
            default: false,
        }
    },
    privacy: {
        keep_profile_private: {
            type: Boolean,
            default: false,
        },
        friends_only: {
            type: Boolean,
            default: false,
        },
        public: {
            type: Boolean,
            default: false,
        }
    },
    reading_preferences: {
        favorite_genre: {
            type:[String],
            default: undefined
        },
        favorite_author: {
            type:[String]
        },
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const Settings = mongoose.model('Settings', settingSchema);
module.exports = Settings;