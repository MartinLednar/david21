const express = require('express');
const emptyCart = require('../utils/emptyCartPay');
const payMailController = require('../controllers/payMailController');

const router = express.Router();

router.route('/').get(emptyCart.cartIsEmpty, payMailController.renderSite);

router.route('/').post(emptyCart.cartIsEmpty, payMailController.setBuyEmail);

module.exports = router;
