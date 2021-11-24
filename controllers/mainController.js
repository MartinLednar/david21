const mongoose = require('mongoose');
const PublicSong = require(__dirname + '/models/publicBeatModel');
const email = require(__dirname + '/utils/email');

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
      res.render('index', {
        categ: 'public',
        foundItems: songs.slice(-3).reverse(),
        cartItems: req.session.cart,
        priceOverall: priceOverall.toFixed(2),
      });
    });
  } catch (err) {
    console.log(err.message, 'Helloooo');
  }
};

exports.sendNewOrder = async (req, res) => {
  try {
    filename = req?.file?.originalname || 'No file provided';
    content = req?.file?.buffer || undefined;

    email.sendEmailOrder({
      from: req.body.mail,
      message: req.body.message,
      attachments: [
        {
          filename,
          content,
        },
      ],
    });

    res.redirect('/#contact');
  } catch (err) {
    console.log(err);
  }
};
