const mongoose = require('mongoose');
const PublicSong = require('../models/publicBeatModel');
const email = require('../utils/email');

exports.renderSite = async (req, res) => {
  try {
    let priceOverall = 0;
    if (!req.session.cart) {
      req.session.cart = [];
    }
    if (req.session.cart.length !== 0) {
      priceOverall = req.session.cart.reduce((acc, item) => {
        return acc + item.price * 1;
      }, 0);
    }

    PublicSong.find({}, '-song', (err, songs) => {
      res.status(200).render('index', {
        categ: 'public',
        foundItems: songs.slice(-3).reverse(),
        cartItems: req.session.cart,
        priceOverall: priceOverall,
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
