const express = require('express');
const deleteSongController = require('../controllers/deleteSongController');

const router = express.Router();

router.route('/').get(deleteSongController.renderDeletePublic);

router.route('/:categ/:id').get(deleteSongController.renderDeletePublic);

router.route('/ordered').get(deleteSongController.renderDeleteCustom);

router
  .route('/ordered/:categ/:id')
  .get(deleteSongController.renderDeleteCustom);

module.exports = router;
