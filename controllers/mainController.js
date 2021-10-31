const mongoose = require('mongoose');
const PublicSong = require('../models/publicBeatModel');
const email = require('../utils/email');

exports.renderSite = async (req, res) => {
  try {
    if (!req.session.cart) {
      req.session.cart = [];
    }
    console.log(req.session);
    PublicSong.find({}, '-song', (err, songs) => {
      res.status(200).render('index', {
        categ: 'public',
        foundItems: songs.slice(-3).reverse(),
        cartItems: req.session.cart,
      });
    });
  } catch (err) {
    console.log(err.message);
  }
};

exports.sendNewOrder = async (req, res) => {
  email.sendEmailOrder({
    from: req.body.mail,
    message: req.body.message,
  });

  res.redirect('/');
};
