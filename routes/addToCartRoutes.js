const express = require('express');
const addToCartController = require('../controllers/addToCartController');
const blackList = require('../utils/blackListHandler');
const songsAvailable = require('../utils/songsAvailable');

const router = express.Router();

router
  .route('/:id')
  .get(
    songsAvailable.songsAvailable,
    blackList.isOnBlackListCart,
    addToCartController.publicToCart
  );

router.route('/delete/:id').get(addToCartController.deleteFromCart);

router
  .route('/ordered')
  .post(
    songsAvailable.songsAvailable,
    blackList.isOnBlackListCart,
    addToCartController.orderedToCart
  );

module.exports = router;
