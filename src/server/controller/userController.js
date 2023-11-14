const User = require('../model/userModel');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const nodemailer = require('nodemailer');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const Token = require('../model/tokenModel');

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
    const { username, email, password } = req.body;

    // Registration confirmation email
    const message = `
  <h2> Welcome, ${username}!</h2>
  <p>Thank you for signing up for CodeBooker.</p>
  `;

    try {
        const existingUser = await User.findOne({
            $or: [{ username: username }, { email: email }],
        });

        if (existingUser) {
            return res.status(400).json({
                message:
                    'User already found. Try to provide a different username/email.',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ email, username, password: hashedPassword });
        await newUser.save();

        // Generate JWT token for the newly registered user
        const token = jwt.sign(
            { email: newUser.email, id: newUser._id },
            'codebooker',
            { expiresIn: '15m' }
        );

        // Send user info and token to front end
        res.status(200).json({
            message: 'Successfully Created',
            user: newUser,
            token: token,
        });

        // Sender account details
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
            },
        });

        // Email details
        const mailOptions = {
            from: process.env.MAIL_USERNAME,
            to: email,
            subject: 'CodeBooker - Registration Confirmation',
            html: message,
        };

        // Send email
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
        res.status(500).json('Something went wrong.');
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
            req.session.userId = user._id; //Save userId to session for feedback submission
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

        // delete token if it exist in db
        const existingToken = await Token.findOne({ userId: existinguser._id });

        if (existingToken) {
            await existingToken.deleteOne();
            console.log('found');
        }

        // Create new reset token
        const resetToken = jwt.sign(
            { id: existinguser._id },
            'codebooker',
            { expiresIn: '30m' } //30min
        );

        // get token expiration time
        const expiresIn = new Date(Date.now() + 30 * 60 * 1000);

        // Save token to db
        const newToken = new Token({
            userId: existinguser._id,
            token: resetToken,
            created_on: Date.now(),
            expires_in: expiresIn,
        });

        await newToken.save();

        // URL link
        const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

        // message to send user via nodemailer
        const message = `
            <h2>Hello ${existinguser.username}</h2>
            <p>Please use the url below to reset your password</p>
            <p>This reset link is valid for ${expiresIn} minutes</p>

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
        //Find token in DB
        const userToken = await Token.findOne({
            token: token,
            expires_in: { $gt: Date.now() },
        });

        if (!userToken) {
            return res.status(401).json({
                message: 'Token expired or invalid',
            });
        }

        // Find user with that specific token
        const userWithToken = await User.findOne({ _id: userToken.userId });

        // hash new password
        const hashPassword = await bcrypt.hash(password, 12);
        // update password & save
        userWithToken.password = hashPassword;
        await userWithToken.save();

        res.status(200).json({
            message: 'Password Reset Successful',
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json('Something went wrong...');
    }
};
