const mongoose = require('mongoose');
const CustomBeat = require('../models/customBeatModel');
const PublicSong = require('../models/publicBeatModel');

exports.renderShop = async (req, res) => {
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

    if (req.query?.search) {
      PublicSong.find({}, '-song', (err, songs) => {
        const searched = songs.filter(song =>
          song.name.includes(req.query.search.trim().toLowerCase())
        );

        res.render('shop', {
          foundItems: searched.reverse(),
          categ: 'public',
          cartItems: req.session.cart,
          priceOverall: priceOverall.toFixed(2),
        });
      });
    } else {
      PublicSong.find({}, '-song', (err, songs) => {
        res.render('shop', {
          foundItems: songs.reverse(),
          categ: 'public',
          cartItems: req.session.cart,
          priceOverall: priceOverall.toFixed(2),
        });
      });
    }
  } catch (err) {
    res.redirect('https://beatsby21.com/');
  }
};

exports.renderShopCustom = async (req, res) => {
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
    if (req.query?.search) {
      CustomBeat.find({}, '-song -password', (err, songs) => {
        const searched = songs.filter(song =>
          song.name.includes(req.query.search.trim().toLowerCase())
        );

        res.render('shop', {
          foundItems: searched.reverse(),
          categ: 'ordered',
          cartItems: req.session.cart,
          priceOverall: priceOverall.toFixed(2),
        });
      });
    } else {
      CustomBeat.find({}, '-song -password', (err, songs) => {
        res.render('shop', {
          foundItems: songs.reverse(),
          categ: 'ordered',
          cartItems: req.session.cart,
          priceOverall: priceOverall.toFixed(2),
        });
      });
    }
  } catch (err) {
    res.redirect('https://beatsby21.com/');
  }
};
