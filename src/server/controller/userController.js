const User = require('../model/userModel');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var jwt = require('jsonwebtoken');

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
            return res.status(400).json({
                message:
                    'User already found Try to provide different username/email...',
            });
        }
        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ email, username, password: hashPassword });
        await newUser.save();
        res.status(200).json({
            message: 'Successfully Created',
            user: newUser,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json('Something went worng...');
    }
};

module.exports.login = async (req, res, next) => {
    let token = '';
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (!user) {
            return res.status(404).json(info);
        }

        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            if (req.body.rememberMe)
                token = jwt.sign(
                    { email: user.email, id: user._id },
                    'codebooker',
                    { expiresIn: '48h' }
                );
            return res.status(200).json({ user: req.user, token: token });
        });
    })(req, res, next);
};

module.exports.logout = async (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.status(200).json('Successfully Logged Out');
    });
};
