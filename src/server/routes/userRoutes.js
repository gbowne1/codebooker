const express = require('express');
const router = express.Router();
const { login, signup, logout } = require('../controller/userController');
const passport = require('passport');

router.post('/login', passport.authenticate('local'), login);
router.post('/logout', logout);
router.post('/signUp', signup);

module.exports = router;
