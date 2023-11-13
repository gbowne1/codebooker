const express = require('express');
const router = express.Router();

const { newProfile, getProfile } = require('../controller/profileController');
router.post('/new-profile', newProfile);
router.get('/get-profile', getProfile);

module.exports = router;
