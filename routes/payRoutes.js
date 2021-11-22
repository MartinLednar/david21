const express = require('express');
const emptyCart = require('../utils/emptyCartPay');
const payController = require('../controllers/payController');

const router = express.Router();

router
  .route('/')
  .get(emptyCart.cartIsEmpty, payController.createCheckoutSession);

module.exports = router;
