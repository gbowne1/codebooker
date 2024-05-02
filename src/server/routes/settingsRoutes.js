const express = require('express');
const router = express.Router();
const { userSettings } = require('../controller/settingsController');
router.post('/user-settings', userSettings);

module.exports = router;