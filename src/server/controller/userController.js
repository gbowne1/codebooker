const User = require('../model/userModel');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const nodemailer = require('nodemailer');

const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');

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
            if (req.body.rememberMe) {
                token = jwt.sign(
                    { email: user.email, id: user._id },
                    'codebooker',
                    { expiresIn: '48h' }
                );
            } else {
                token = jwt.sign(
                    { email: user.email, id: user._id },
                    'codebooker',
                    { expiresIn: '15m' } //15min
                );
            }
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
module.exports.forgotPassword = async (req, res) => {
    const { email } = { ...req.body };
    try {
        const existinguser = await User.findOne({ email });

        if (!existinguser) {
            return res.status(404).json({
                message:
                    'Failed to load resource: the server responded with a status of 404 (Not Found)',
            });
        }

        // Checks if resetPasswordToken exist in existinguser collection, delete it.
        if (existinguser.resetPasswordToken) {
            await User.updateOne(
                { _id: existinguser._id },
                { $unset: { resetPasswordToken: 1 } }
            );
        }
        // Create new token
        const resetToken = jwt.sign(
            { id: existinguser._id },
            'codebooker',
            { expiresIn: '30m' } //30min
        );

    
        //Update existing user collection with new reset token
        await User.updateOne(
            { _id: existinguser._id },
            { $set: { resetPasswordToken: resetToken } }
        );

        // URL link
        const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
        
        // message to send user via nodemailer
        const message = `
            <h2>Hello ${existinguser.username}</h2>
            <p>Please use the url below to reset your password</p>

            <a href=http://localhost:3000/reset-password/${resetToken}>${resetLink}</a>
            <p>Regards</p>
            <p>CodeBooker Team</p>
        `;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.MAIL_USERNAME,
            to: email,
            subject: 'Password Reset Link',
            html: message,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                res.status(200).json('Email sent!');
                console.log('Email sent: ' + info.response);
            }
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json('Something went wrong...');
    }
};

module.exports.resetPassword = async (req, res) => {
    const { password } = { ...req.body };
    const { token } = { ...req.params };

    try {
        
        //Find user with this token in DB
        const userWithResetToken = await User.findOne({
            resetPasswordToken: token,
        });
    
        if (!userWithResetToken) {
            return res.status(401).json({
                message: 'Token expired or invalid',
            });
        }

        // Hash new password
        const hashPassword = await bcrypt.hash(password, 12);
        userWithResetToken.password = hashPassword;
        await userWithResetToken.save();

        res.status(200).json({
            message: 'Password Reset Successful',
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json('Something went wrong...');
    }
};
