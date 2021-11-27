const express = require('express');
const discMessageController = require('../controllers/addDiscMsgController');

const router = express.Router();

router
  .route('/')
  .get(discMessageController.renderSite)
  .post(discMessageController.setNewMessage);

module.exports = router;
