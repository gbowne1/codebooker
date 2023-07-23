const express = require('express');
const router = express.Router();

const { newReview } = require('../controller/reviewController');

router.post('/newreview', newReview);

module.exports = router;
