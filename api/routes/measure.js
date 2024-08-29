const express = require('express');
const router = express.Router();
const MeasureController = require('../controllers/MeasureController');
const measureController = new MeasureController();

router.get('/:customer_code/list', (req, res) => measureController.listMeasures(req, res));

module.exports = router;
