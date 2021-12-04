const express = require('express');
const paymentSuccessController = require('../controllers/paymentSuccessController');
const blackList = require('../utils/blackListHandler');

const router = express.Router();

router
  .route('/')
  .get(
    blackList.handleBlackListOnSuccess,
    paymentSuccessController.handlePayment
  );

module.exports = router;
