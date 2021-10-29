const express = require('express');
const isLogged = require('../utils/isLogged');
const loginController = require('../controllers/loginController');

const router = express.Router();

router
  .route('/')
  .get(isLogged.loginJWT, loginController.renderSite)
  .post(loginController.renderAdminMenu);

module.exports = router;
