const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const CustomSong = require('../models/customBeatModel');
const PublicSong = require('../models/publicBeatModel');

exports.publicToCart = async (req, res) => {
  try {
    console.log(req.path);
    const id = req.params.id;
    req.session.cart.forEach(song => {
      if (song._id === id) {
        res.redirect('/');
      } else {
        PublicSong.findById(id, '-song', function (err, song) {
          req.session.cart.push(song);
          res.redirect('/');
        });
      }
    });
  } catch (err) {
    console.log(err.message);
  }
};

exports.orderedToCart = async (req, res) => {
  try {
    console.log(req.body);
    const { clickedSong, formPassword } = req.body;
    CustomSong.findById(clickedSong, '-song', function (err, song) {
      bcrypt.compare(formPassword.trim(), song.password, (err, result) => {
        if (result) {
          req.session.cart.forEach(item => {
            if (item._id === clickedSong) {
              res.redirect('/shop/ordered');
            } else {
              song.password = undefined;
              req.session.cart.push(song);
              res.redirect('/shop/ordered');
            }
          });
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
