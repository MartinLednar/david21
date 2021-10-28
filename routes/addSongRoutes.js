const express = require('express');
const multer = require('multer');
const isLogged = require('../utils/isLogged');
const addSongController = require('../controllers/addSongController');

const upload = multer();

const router = express.Router();

router
  .route('/')
  .get(isLogged.adminJWT, addSongController.renderSite)
  .post(upload.single('file'), addSongController.addSong);

module.exports = router;
