const express = require('express');
const multer = require('multer');
const addSongController = require('../controllers/addSongController');

const upload = multer();

const router = express.Router();

router
  .route('/')
  .get(addSongController.renderSite)
  .post(upload.single('file'), addSongController.addSong);

module.exports = router;
