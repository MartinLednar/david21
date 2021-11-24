const express = require('express');
const multer = require('multer');
const mainController = require(__dirname + '/controllers/mainController');

const upload = multer();

const router = express.Router();

router.route('/').get(mainController.renderSite);

router
  .route('/sendOrder')
  .post(upload.single('example'), mainController.sendNewOrder);

module.exports = router;
