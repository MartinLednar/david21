const express = require('express');
const addToCartController = require('../controllers/addToCartController');

const router = express.Router();

router.route('/:id').get(addToCartController.publicToCart);

router.route('/ordered').post(addToCartController.orderedToCart);

module.exports = router;
