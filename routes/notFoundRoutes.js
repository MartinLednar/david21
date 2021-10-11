const express = require('express');
const notFoundController = require('../controllers/notFoundController');

const router = express.Router();

router.route('/').get(notFoundController.renderSite);

module.exports = router;
