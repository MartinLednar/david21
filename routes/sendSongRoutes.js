const express = require('express');
const sendSongController = require('../controllers/sendSongController');

const router = express.Router();

router.route('/:categ/:id').get(sendSongController.sendSong);

module.exports = router;
