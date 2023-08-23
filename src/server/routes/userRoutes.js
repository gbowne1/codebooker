const express = require('express');
const router = express.Router();
const { login, signup, logout, forgotPassword, resetPassword } = require('../controller/userController');

router.post('/login', login);
router.post('/logout', logout);
router.post('/register', signup);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);

module.exports = router;
