const mongoose = require('mongoose');

const discMessage = require('../models/discountMessageModel');

exports.renderSite = async (req, res) => {
  try {
    discMessage.findOne({}, async (err, foundItem) => {
      res.render('addDiscMsg', {
        currMessage: foundItem?.message,
      });
    });
  } catch (error) {
    res.redirect('/login');
  }
};

exports.setNewMessage = async (req, res) => {
  try {
    if (req.body.noMessage) {
      discMessage.findOne({}, async (err, foundItem) => {
        try {
          foundItem.message = undefined;
          await foundItem.save();
          res.redirect('https://beatsby21.com/disc-message');
        } catch (error) {
          res.redirect('https://beatsby21.com/login');
        }
      });
    } else {
      discMessage.findOne({}, async (err, foundItem) => {
        try {
          foundItem.message = req.body.message;
          foundItem.save();
          res.redirect('https://beatsby21.com/disc-message');
        } catch (error) {
          res.redirect('https://beatsby21.com/login');
        }
      });
    }
  } catch (error) {
    res.redirect('https://beatsby21.com/login');
  }
};
