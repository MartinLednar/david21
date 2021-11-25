const express = require('express');
const emptyCart = require('../utils/emptyCartPay');
const songsAvailable = require('../utils/songsAvailable');

const payMailController = require('../controllers/payMailController');

const router = express.Router();

router
  .route('/')
  .get(
    emptyCart.cartIsEmpty,
    songsAvailable.songsAvailable,
    payMailController.renderSite
  );

router
  .route('/')
  .post(
    emptyCart.cartIsEmpty,
    songsAvailable.songsAvailable,
    payMailController.setBuyEmail
  );

module.exports = router;
