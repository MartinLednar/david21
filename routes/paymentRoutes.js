const express = require('express');
const paymentController = require('../controllers/paymentController');

const router = express.Router();

router.route('/:categ').get(paymentController.handlePayment);

module.exports = router;
