const mongoose = require('mongoose');
const PublicSong = require('../models/publicBeatModel');

exports.renderSite = async (req, res) => {
  try {
    req.session.cartItems = [];
    console.log(req.session);
    PublicSong.find({}, '-song', (err, songs) => {
      res.status(200).render('index', {
        categ: 'public',
        foundItems: songs.slice(-3).reverse(),
      });
    });
  } catch (err) {
    console.log(err.message);
  }
};
