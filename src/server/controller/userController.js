const User = require('../model/userModel');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//session passport
passport.use(
    new LocalStrategy(async (usernameOrEmail, password, done) => {
        try {
            const user = await User.findOne({
                $or: [
                    { username: usernameOrEmail },
                    { email: usernameOrEmail },
                ],
            });
            if (!user) {
                console.log('on no user');
                return done(null, false, {
                    message: 'Incorrect username or email.',
                });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});
module.exports.signup = async (req, res) => {
    const { username, email, password } = { ...req.body };

    try {
        const existinguser = await User.findOne({
            $or: [{ username: username }, { email: email }],
        });
        if (existinguser) {
            return res.status(400).json('User already found..');
        }
        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ email, username, password: hashPassword });
        await newUser.save();
        req.login(newUser, (err) => {
            if (err) res.status(500).json({ message: err });
            res.status(200).json({
                message: 'Successfully Created',
                user: newUser,
            });
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json('Something went worng...');
    }
};

module.exports.login = async (req, res) => {
    res.status(200).json(req.user);
};

module.exports.logout = async (req, res) => {
    req.logout(function (err) {
        if (err) {
            return res.status(500).json(err);
        }
        res.status(200).json('Successfully Logged Out');
    });
};
