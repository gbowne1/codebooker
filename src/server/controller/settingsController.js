const Settings = require('../model/settingsModel');
const User = require('../model/userModel');
module.exports.userSettings = async (req, res) => {
    const {checkedCheckboxes, userEmail} = req.body;
    const settingObj1 = (settingName, name) =>{
        const arr = checkedCheckboxes.find((settingObj)=> settingObj.name === settingName);
        return arr?.values?.filter((item)=> item.name === name);
    }
    const settingObj2 = (name) =>{
        const settingArrName = checkedCheckboxes.find((settingObj)=> settingObj.name === name);
        return settingArrName;
    }
    const s = settingObj2('authors');
    console.log(s.values);
    try {
        // find settings
        const user = await User.findOne({ email:userEmail });
        let settings = await Settings.findOne({ userId: user._id });
        if(!settings){
            settings = new Settings({
                userId: user._id,
                push_notification:{
                    new_book_release: settingObj1('notification', 'newBook')?.[0]?.status ?? false,
                    book_recommendation: settingObj1('notification', 'recommendation')?.[0]?.status ?? false,
                    book_review_update: settingObj1('notification', 'reviews')?.[0]?.status ?? false,
                },
                email_notification:{
                    codebooker_updates: settingObj1('notification', 'updates')?.[0]?.status ?? false,
                    tips: settingObj1('notification', 'tips')?.[0]?.status ?? false,
                    suggestions: settingObj1('notification', 'suggestions')?.[0]?.status ?? false,
                },
                privacy: {
                    keep_profile_private: settingObj1('privacy', 'profile-visibility')?.[0]?.status ?? false,
                    friends_only: settingObj1('privacy', 'friends_only')?.[0]?.status ?? false,
                    public: settingObj1('privacy', 'public')?.[0]?.status ?? false,
                },
                reading_preferences: {
                    favorite_genre: settingObj2('reading_preferences')?.values ?? [],
                    favorite_author: settingObj2('authors')?.values ?? [],
                }
            })
        }  else {
            // Update existing settings
            settings.push_notification.new_book_release = settingObj1('notification', 'newBook')?.[0]?.status ?? false;
            settings.push_notification.book_recommendation = settingObj1('notification', 'recommendation')?.[0]?.status ?? false
            settings.push_notification.book_review_update = settingObj1('notification', 'reviews')?.[0]?.status ?? false;
            settings.email_notification.codebooker_updates = settingObj1('notification', 'updates')?.[0]?.status ?? false;
            settings.email_notification.tips = settingObj1('notification', 'tips')?.[0]?.status ?? false;
            settings.email_notification.suggestions = settingObj1('notification', 'suggestions')?.[0]?.status ?? false;
            settings.privacy.keep_profile_private = settingObj1('privacy', 'profile-visibility')?.[0]?.status ?? false;
            settings.privacy.friends_only = settingObj1('privacy', 'friends_only')?.[0]?.status ?? false;
            settings.privacy.public = settingObj1('privacy', 'public')?.[0]?.status ?? false;
            settings.reading_preferences.favorite_genre = settingObj2('reading_preferences')?.values ?? settings.reading_preferences.favorite_genre;
            settings.reading_preferences.favorite_author = settingObj2('authors')?.values ?? settings.reading_preferences.favorite_author;
        }
        await settings.save();
        res.status(200).json({ message: 'Settings updated successfully' });
    } catch (err) {
        console.error('Error updating settings:', err);
        res.status(500).json({ message: 'Internal server error' });
    }

};