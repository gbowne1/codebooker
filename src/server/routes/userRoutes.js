const express = require('express');
const router = express.Router();
const {
    login,
    signup,
    logout,
    forgotPassword,
    resetPassword,
} = require('../controller/userController');
const { allfeedback, addfeedback } = require('../controller/feedBackController');

// Ensure user is logged in.
function requireLogin(req, res, next) {
  if (!req.session.userId) {
      return res.status(401).send('You must be logged in.');
  }
  next();
}

//auth
router.post('/login', login);
router.post('/logout', logout);
router.post('/register', signup);

//forgot password
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);

//feedback routes
router.get('/feedback/all', allfeedback);
router.post('/feedback/new', requireLogin, addfeedback);

module.exports = router;
