const express = require('express');
const router = express.Router();
const {
    login,
    signup,
    logout,
    forgotPassword,
    resetPassword,
} = require('../controller/userController');
const {
    allfeedback,
    addfeedback,
    emailFeedback,
} = require('../controller/feedBackController');

//auth
router.post('/login', login);
router.post('/logout', logout);
router.post('/register', signup);

//forgot password
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);

//feedback routes
router.get('/feedback/all', allfeedback);
router.post('/feedback/new', addfeedback);
router.post('/feedback/mail', emailFeedback);

module.exports = router;
