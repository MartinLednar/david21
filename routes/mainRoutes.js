const express = require('express');
const multer = require('multer');
const mainController = require('../controllers/mainController');
const blackList = require('../utils/blackListHandler');

const upload = multer();

const router = express.Router();

router.route('/').get(blackList.checkStripeSession, mainController.renderSite);

router
  .route('/sendOrder')
  .post(upload.single('example'), mainController.sendNewOrder);

module.exports = router;
