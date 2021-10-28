const express = require('express');
const isLogged = require('../utils/isLogged');
const deleteSongController = require('../controllers/deleteSongController');

const router = express.Router();

router
  .route('/')
  .get(isLogged.adminJWT, deleteSongController.renderDeletePublic);

router
  .route('/:categ/:id')
  .get(isLogged.adminJWT, deleteSongController.renderDeletePublic);

router
  .route('/ordered')
  .get(isLogged.adminJWT, deleteSongController.renderDeleteCustom);

router
  .route('/ordered/:categ/:id')
  .get(isLogged.adminJWT, deleteSongController.renderDeleteCustom);

module.exports = router;
