const express = require('express');
const buyEmail = require('../utils/buyEmail');
const payController = require('../controllers/payController');

const router = express.Router();

router.route('/').get(buyEmail.isBuyEmail, payController.createCheckoutSession);

module.exports = router;
