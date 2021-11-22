const express = require('express');

const payController = require('../controllers/payController');

const router = express.Router();

router.route('/').get(payController.createCheckoutSession);

module.exports = router;
