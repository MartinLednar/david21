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
          if (!foundItem) {
            await discMessage.create({ message: '' });
            res.redirect('/disc-message');
          } else {
            foundItem.message = undefined;
            await foundItem.save();
            res.redirect('/disc-message');
          }
        } catch (error) {
          res.redirect('/login');
        }
      });
    } else {
      discMessage.findOne({}, async (err, foundItem) => {
        try {
          foundItem.message = req.body.message;
          foundItem.save();
          res.redirect('/disc-message');
        } catch (error) {
          res.redirect('/login');
        }
      });
    }
  } catch (error) {
    res.redirect('/login');
  }
};
