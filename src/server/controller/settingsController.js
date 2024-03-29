const Setting = require('../model/settingsModel');
const User = require('../model/userModel');
module.exports.userSettings = async (req, res) => {
    const {
        userEmail
    } = req.body;
    try {
        // find user
        const user = await User.findOne({ email:userEmail });
        if (!user) {
            return res.status(404).json({
                message:
                    'Sorry no user with that email exist(USER NOT FOUND)',
            });
        }
        // Save settings to db
        const userSettings = new Setting({
            created_at: Date.now(),
        });
        await userSettings.save();
        res.status(200).json({
            message: 'User Settings Saved Successful',
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};