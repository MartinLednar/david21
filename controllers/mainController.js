const mongoose = require('mongoose');
const publicBeat = require('../models/publicBeatModel');

exports.renderSite = async (req, res) => {
  try {
    console.log(req.session);
    publicBeat.find({}, '-song', (err, songs) => {
      res.status(200).render('index', {
        categ: 'public',
        foundItems: songs.slice(-3).reverse(),
      });
    });
  } catch (err) {
    console.log(err.message);
  }
};
