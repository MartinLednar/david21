const express = require('express');
const buyEmail = require('../utils/buyEmail');
const blackList = require('../utils/blackListHandler');
const songsAvailable = require('../utils/songsAvailable');

const payController = require('../controllers/payController');

const router = express.Router();

router
  .route('/')
  .get(
    buyEmail.isBuyEmail,
    songsAvailable.songsAvailable,
    blackList.checkStripeSession,
    blackList.isOnBlackList,
    blackList.addToBlackList,
    payController.createCheckoutSession
  );

module.exports = router;
