const express = require('express');
const router = express.Router();
const ReadingController = require('../controllers/ReadingController');
const readingController = new ReadingController();

router.patch('/confirm', (req, res) => readingController.confirmReading(req, res));

module.exports = router;
