const express = require('express');
const router = express.Router();
const { login, signup, logout } = require('../controller/userController');

router.post('/login', login);
router.post('/logout', logout);
router.post('/register', signup);

module.exports = router;
