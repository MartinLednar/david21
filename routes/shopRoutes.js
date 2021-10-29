const express = require('express');
const shopController = require('../controllers/shopController');

const router = express.Router();

router.route('/').get(shopController.renderShop);

router
  .route('/ordered')
  .get(shopController.renderShopCustom)
  .post(shopController.orderedToCart);

module.exports = router;
