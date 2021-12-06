const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const CustomSong = require('../models/customBeatModel');
const PublicSong = require('../models/publicBeatModel');

exports.publicToCart = async (req, res) => {
  try {
    const id = req.params.id;
    if (req.session.cart.length === 0) {
      PublicSong.findById(id, '-song', function (err, song) {
        if (err || !song) {
          return res.redirect(req.header('Referer'));
        } else {
          req.session.cart.push(song);
          res.redirect(req.header('Referer'));
        }
      });
    } else {
      const itemExists = req.session.cart.every(song => {
        return song._id !== id;
      });

      if (!itemExists) {
        res.redirect(req.header('Referer'));
      } else {
        PublicSong.findById(id, '-song', function (err, song) {
          if (err || !song) {
            return res.redirect('/');
          }

          req.session.cart.push(song);
          res.redirect(req.header('Referer'));
        });
      }
    }
  } catch (err) {
    res.redirect(req.header('Referer'));
  }
};

exports.orderedToCart = async (req, res) => {
  try {
    const { clickedSong, formPassword } = req.body;
    CustomSong.findById(clickedSong, '-song', function (err, song) {
      if (err || !song) {
        req.session.cart = [];
        return res.redirect(req.header('Referer'));
      } else {
        bcrypt.compare(formPassword.trim(), song.password, (err, result) => {
          if (result) {
            const itemExists = req.session.cart.every(song => {
              return song._id !== clickedSong;
            });
            if (!itemExists) {
              res.redirect(req.header('Referer'));
            } else {
              song.password = undefined;
              req.session.cart.push(song);
              res.redirect(req.header('Referer'));
            }
          } else {
            res.redirect(req.header('Referer'));
          }
        });
      }
    });
  } catch (err) {
    res.redirect(req.header('Referer'));
  }
};

exports.deleteFromCart = async (req, res) => {
  try {
    const id = req.params.id;
    req.session.cart = req.session.cart.filter(el => el._id !== id);
    res.redirect(req.header('Referer'));
  } catch (err) {
    res.redirect('https://beatsby21/');
  }
};
