const express = require('express');
const loginController = require('../controllers/loginController');

const router = express.Router();

router.route('/').get(loginController.renderSite);

module.exports = router;
