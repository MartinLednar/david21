const express = require('express');
const blackList = require('../utils/blackListHandler');
const rulesController = require('../controllers/rulesController');

const router = express.Router();

router
  .route('/:categ')
  .get(blackList.checkStripeSession, rulesController.renderRules);

module.exports = router;
