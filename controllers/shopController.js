const mongoose = require('mongoose');
const CustomBeat = require('../models/customBeatModel');
const PublicSong = require('../models/publicBeatModel');

exports.renderShop = async (req, res) => {
  try {
    if (!req.session.cart) {
      req.session.cart = [];
    }
    if (req.query?.search) {
      PublicSong.find({}, '-song', (err, songs) => {
        const searched = songs.filter(song =>
          song.name.includes(req.query.search.trim().toLowerCase())
        );

        res.render('shop', {
          foundItems: searched.reverse(),
          categ: 'public',
          cartItems: req.session.cart,
        });
      });
    } else {
      PublicSong.find({}, '-song', (err, songs) => {
        res.render('shop', {
          foundItems: songs.reverse(),
          categ: 'public',
          cartItems: req.session.cart,
        });
      });
    }
  } catch (err) {
    console.log(err.message);
  }
};

exports.renderShopCustom = async (req, res) => {
  try {
    if (!req.session.cart) {
      req.session.cart = [];
    }
    if (req.query?.search) {
      CustomBeat.find({}, '-song -password', (err, songs) => {
        console.log(songs);
        const searched = songs.filter(song =>
          song.name.includes(req.query.search.trim().toLowerCase())
        );

        res.render('shop', {
          foundItems: searched.reverse(),
          categ: 'ordered',
          cartItems: req.session.cart,
        });
      });
    } else {
      CustomBeat.find({}, '-song -password', (err, songs) => {
        console.log(songs);
        res.render('shop', {
          foundItems: songs.reverse(),
          categ: 'ordered',
          cartItems: req.session.cart,
        });
      });
    }
  } catch (err) {
    console.log(err.message);
  }
};
