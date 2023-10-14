const Profile = require('../model/profileModel');
const User = require('../model/userModel');

module.exports.newProfile = async (req, res) => {
    const {values, selectedFile} = req.body;
    console.log(values, selectedFile);
    res.status(200).send('profile created !');
};