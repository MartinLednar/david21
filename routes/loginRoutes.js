const express = require('express');
const loginController = require('../controllers/loginController');

const router = express.Router();

router
  .route('/')
  .get(loginController.renderSite)
  .post(loginController.renderAdminMenu);

router.route('/admin').get(loginController.renderMenu);
module.exports = router;
