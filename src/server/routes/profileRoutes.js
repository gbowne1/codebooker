const express = require('express');
const router = express.Router();

const { newProfile } = require('../controller/profileController');
router.post('/new-profile', newProfile);

module.exports = router;
