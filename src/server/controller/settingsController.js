const Settings = require('../model/settingsModel');
const User = require('../model/userModel');
module.exports.userSettings = async (req, res) => {
    const {checkedCheckboxes, userEmail} = req.body;
    const [notification, privacy, reading_preferences, author] = checkedCheckboxes;
    const extractSetting = (arr, name) =>{
        return arr?.filter((item)=> item.name === name);
    }
    try {
        // find settings
        const user = await User.findOne({ email:userEmail });
        let settings = await Settings.findOne({ userId: user._id });
        if(!settings){
            settings = new Settings({
                userId: user._id,
                push_notification:{
                    new_book_release: extractSetting(notification?.values, 'newBook')?.[0]?.status ?? false,
                    book_recommendation: extractSetting(notification?.values, 'recommendation')?.[0]?.status ?? false,
                    book_review_update: extractSetting(notification?.values, 'reviews')?.[0]?.status ?? false,
                },
                email_notification:{
                    codebooker_updates: extractSetting(notification?.values, 'updates')?.[0]?.status ?? false,
                    tips: extractSetting(notification?.values, 'tips')?.[0]?.status ?? false,
                    suggestions: extractSetting(notification?.values, 'suggestions')?.[0]?.status ?? false,
                },
                privacy: {
                    keep_profile_private: extractSetting(privacy?.values, 'profile-visibility')?.[0]?.status ?? false,
                    friends_only: extractSetting(privacy?.values, 'friends_only')?.[0]?.status ?? false,
                    public: extractSetting(privacy?.values, 'public')?.[0]?.status ?? false,
                },
                reading_preferences: {
                    favorite_genre: reading_preferences?.values ?? [],
                    favorite_author: author?.values ?? [],
                }
            })
        }  else {
            // Update existing settings
            settings.push_notification.new_book_release = extractSetting(notification?.values, 'newBook')?.[0]?.status ?? false;
            settings.push_notification.book_recommendation = extractSetting(notification?.values, 'recommendation')?.[0]?.status ?? false
            settings.push_notification.book_review_update = extractSetting(notification?.values, 'reviews')?.[0]?.status ?? false;
            settings.email_notification.codebooker_updates = extractSetting(notification?.values, 'updates')?.[0]?.status ?? false;
            settings.email_notification.tips = extractSetting(notification?.values, 'tips')?.[0]?.status ?? false;
            settings.email_notification.suggestions = extractSetting(notification?.values, 'suggestions')?.[0]?.status ?? false;
            settings.privacy.keep_profile_private = extractSetting(privacy?.values, 'profile-visibility')?.[0]?.status ?? false;
            settings.privacy.friends_only = extractSetting(privacy?.values, 'friends_only')?.[0]?.status ?? false;
            settings.privacy.public = extractSetting(privacy?.values, 'public')?.[0]?.status ?? false;
            settings.reading_preferences.favorite_genre = reading_preferences?.values ?? settings.reading_preferences.favorite_genre;
            settings.reading_preferences.favorite_author = author?.values ?? settings.reading_preferences.favorite_author;
        }
        await settings.save();
        res.status(200).json({ message: 'Settings updated successfully' });
    } catch (err) {
        console.error('Error updating settings:', err);
        res.status(500).json({ message: 'Internal server error' });
    }

};