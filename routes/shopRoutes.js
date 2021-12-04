const express = require('express');
const blackList = require('../utils/blackListHandler');
const shopController = require('../controllers/shopController');

const router = express.Router();

router.route('/').get(blackList.checkStripeSession, shopController.renderShop);

router
  .route('/ordered')
  .get(blackList.checkStripeSession, shopController.renderShopCustom);

module.exports = router;
