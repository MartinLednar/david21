const express = require('express');
const notFoundController = require('../controllers/notFoundController');
const blackList = require('../utils/blackListHandler');

const router = express.Router();

router
  .route('/')
  .get(blackList.checkStripeSession, notFoundController.renderSite);

module.exports = router;
