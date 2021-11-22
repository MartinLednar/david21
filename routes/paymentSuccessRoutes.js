const express = require('express');
const paymentSuccessController = require('../controllers/paymentSuccessController');

const router = express.Router();

router.route('/').get(paymentSuccessController.handlePayment);

module.exports = router;
