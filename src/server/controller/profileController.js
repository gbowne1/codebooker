const Profile = require('../model/profileModel');
const User = require('../model/userModel');

module.exports.newProfile = async (req, res) => {
    const {
        name,
        alias,
        bio,
        location,
        age,
        education,
        occupation,
        operatingSystem,
        programingSkills,
        favoriteEditor,
        githubLink,
        portfolioURL,
        youtubeLink,
        linkedInLink,
        twitterLink,
        gitLab,
        showAge,
        selectedFile,
        city,
        userEmail,
    } = req.body;
    try {
        // find user
        const user = await User.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).json({
                message: 'Sorry no user with that email exist(USER NOT FOUND)',
            });
        }
        // Save profile to db
        const newProfile = new Profile({
            userId: user._id,
            email: userEmail,
            profile_picture: selectedFile,
            name,
            bio,
            alias,
            location,
            city,
            education,
            age,
            display_age: showAge,
            occupation,
            skills: programingSkills,
            text_editor: favoriteEditor,
            operating_system: operatingSystem,
            portfolio_link: portfolioURL,
            youtube: youtubeLink,
            linkedIn: linkedInLink,
            twitter: twitterLink,
            gitlab: gitLab,
            github: githubLink,
            created_at: Date.now(),
        });
        await newProfile.save();
        res.status(200).json({
            message: 'Profile Created Successful',
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports.getProfile = async (req, res) => {
    const { userEmail } = req.body;
    try {
        // Find the user profile by email
        const userProfile = await Profile.findOne({ email: userEmail });
        if (!userProfile) {
            return res.status(404).json({
                message:
                    'Sorry no user with that profile exist(USER NOT FOUND)',
            });
        }
        // Send response with user profile data to frontend
        res.status(200).json(userProfile);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
