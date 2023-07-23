const express = require('express');
const router = express.Router();

const { login, signup } = require('../controller/userController');

router.post('/login', login);
router.post('/signUp', signup);

module.exports = router;
