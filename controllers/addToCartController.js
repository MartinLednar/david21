const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const CustomSong = require('../models/customBeatModel');
const PublicSong = require('../models/publicBeatModel');

exports.publicToCart = async (req, res) => {
  try {
    console.log(req.session.cart);
    const id = req.params.id;
    if (req.session.cart.length === 0) {
      PublicSong.findById(id, '-song', function (err, song) {
        req.session.cart.push(song);
        res.redirect('/');
      });
    } else {
      const itemExists = req.session.cart.every(song => {
        return song._id !== id;
      });

      if (!itemExists) {
        res.redirect('/');
      } else {
        PublicSong.findById(id, '-song', function (err, song) {
          req.session.cart.push(song);
          res.redirect('/');
        });
      }
    }
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
          const itemExists = req.session.cart.every(song => {
            return song._id !== clickedSong;
          });
          if (!itemExists) {
            res.redirect('/');
          } else {
            song.password = undefined;
            req.session.cart.push(song);
            res.redirect('/shop/ordered');
          }
        } else {
          res.redirect('/shop/ordered');
        }
      });
    });
  } catch (err) {
    console.log(err.message);
  }
};

exports.deleteFromCart = async (req, res) => {
  try {
    const id = req.params.id;
    req.session.cart = req.session.cart.filter(el => el._id !== id);
    res.redirect('/');
  } catch (err) {
    console.log(err.message);
  }
};
