const User = require('../model/userModel');
const Support = require('../model/supportModel');
const nodemailer = require('nodemailer');

module.exports.newSupport = async (req, res) => {
    const { name, email, description } = req.body;
    try {
        // find user
        const submittingUser = await User.findOne({ email });
        if (!submittingUser) {
            return res.status(404).json({
                message:
                    'Please use your Codebooker email address or verify your email address (NOT FOUND)',
            });
        }

        // save to db
        const newSupport = new Support({
            userId: submittingUser._id,
            description,
            status: 'In Progress',
            createdAt: Date.now(),
        });

        await newSupport.save();
        // send message to support mail address
        const message = `
        <h2>New Support Request</h2>
        <li>
            <p>User name:${name}</p>
            <p>User email:${email}</p>
        </li>
        <p>${description}</p>
    `;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: email,
            to: process.env.MAIL_USERNAME,
            subject: 'Assistance Needed',
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
        res.status(200);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
