const User = require('../model/userModel');
const bcrypt = require('bcryptjs');

module.exports.signup = async (req, res) => {
    const { email, password } = { ...req.body };

    try {
        const existinguser = await User.findOne({ email });
        if (existinguser) {
            return res.status(400).json('User already found..');
        }
        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ email, password: hashPassword });
        await newUser.save();
        res.status(200).json({ user: newUser });
    } catch (err) {
        console.log(err.message);
        res.status(500).json('Something went worng...');
    }
};

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existinguser = await User.findOne({ email });
        if (!existinguser) {
            console.log('User not found...');
            return res.status(404).json('User not found...');
        }
        const isPasswordCrt = await bcrypt.compare(
            password,
            existinguser.password
        );
        if (!isPasswordCrt) {
            return res.status(400).json('Password Incorrect');
        }
        res.status(200).json({ user: existinguser });
    } catch (err) {
        res.status(500).json(err.message);
    }
};
