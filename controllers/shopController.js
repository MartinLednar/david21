const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const customBeat = require('../models/customBeatModel');
const publicBeat = require('../models/publicBeatModel');

exports.renderShop = async (req, res) => {
  try {
    if (req.query?.search) {
      publicBeat.find({}, '-song', (err, songs) => {
        const searched = songs.filter(song =>
          song.name.includes(req.query.search.trim())
        );

        res.render('shop', { foundItems: searched.reverse(), categ: 'public' });
      });
    } else {
      publicBeat.find({}, '-song', (err, songs) => {
        res.render('shop', { foundItems: songs.reverse(), categ: 'public' });
      });
    }
  } catch (err) {
    console.log(err.message);
  }
};

exports.renderShopCustom = async (req, res) => {
  try {
    if (req.query?.search) {
      customBeat.find({}, '-song -password', (err, songs) => {
        console.log(songs);
        const searched = songs.filter(song =>
          song.name.includes(req.query.search.trim())
        );

        res.render('shop', {
          foundItems: searched.reverse(),
          categ: 'ordered',
        });
      });
    } else {
      customBeat.find({}, '-song -password', (err, songs) => {
        console.log(songs);
        res.render('shop', { foundItems: songs.reverse(), categ: 'ordered' });
      });
    }
  } catch (err) {
    console.log(err.message);
  }
};

exports.orderedToCart = async (req, res) => {
  try {
    console.log(req.body);
    const { clickedSong, formPassword } = req.body;
    customBeat.findById(clickedSong, function (err, foundSong) {
      bcrypt.compare(formPassword.trim(), foundSong.password, (err, result) => {
        if (result) {
          console.log('Good password!');
          res.redirect('/shop/ordered');
        } else {
          console.log('Wrong password!');
          res.redirect('/shop/ordered');
        }
      });
    });
  } catch (err) {
    console.log(err.message);
  }
};
