const express = require('express');
const salesController = require('../controllers/sales');

const router = express.Router();

router.get('/current', salesController.getCurrentFlashSale);

module.exports = router;
