const express = require('express');
const router = express.Router();

const { newSupport } = require('../controller/supportController');
router.post('/newsupport', newSupport);
module.exports = router;
