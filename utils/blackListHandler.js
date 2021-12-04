const BlackList = require('../models/BLModel');
const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET);

exports.isOnBlackList = async (req, res, next) => {
  try {
    const cart = req.session.cart;
    BlackList.findOne({}, 'blackList', (err, foundItem) => {
      if (!foundItem) {
        next();
      } else {
        const cartFilter = cart.filter(
          item => !foundItem.blackList.includes(item._id)
        );
        if (cartFilter.length === cart.length) {
          next();
        } else {
          req.session.cart = cartFilter;
          res.redirect('/shop');
        }
      }
    });
  } catch (error) {
    res.redirect(req.header('Referer'));
  }
};

exports.isOnBlackListCart = async (req, res, next) => {
  try {
    const id = req.params.id;
    BlackList.findOne({}, 'blackList', (err, foundItem) => {
      if (!foundItem) {
        next();
      } else {
        const itemInBlackList = foundItem.blackList.includes(id);
        if (itemInBlackList) {
          res.redirect(req.header('Referer'));
        } else {
          next();
        }
      }
    });
  } catch (error) {
    res.redirect(req.header('Referer'));
  }
};

exports.addToBlackList = async (req, res, next) => {
  const cart = req.session.cart;
  const songsIds = cart.map(song => String(song._id));
  BlackList.findOne({}, (err, item) => {
    if (!item) {
      BlackList.create({ blackList: songsIds });
      next();
    } else {
      item.blackList.push(...songsIds);
      item.save();
      next();
    }
  });
};

exports.handleBlackListOnSuccess = async (req, res, next) => {
  const cart = req.session.cart;
  const songsIds = cart.map(song => String(song._id));

  BlackList.findOne({}, async (err, item) => {
    if (cart.length === 0) {
      res.redirect('/');
    } else if (!item) {
      BlackList.create({ blackList: [] });
      res.redirect('/');
    } else {
      const allOnBlackList = songsIds.every(song =>
        item.blackList.includes(song)
      );

      if (allOnBlackList) {
        const session = await stripe.checkout.sessions.retrieve(
          req.session.stripeSession
        );

        if (session.status === 'complete') {
          return next();
        } else {
          res.redirect('/');
        }
      } else {
        res.redirect('/');
      }
    }
  });
};

exports.checkStripeSession = async (req, res, next) => {
  try {
    if (req?.session) {
      if (req.session.stripeSession === '' || !req.session?.stripeSession) {
        next();
      } else {
        const cart = req.session.cart;
        const songsIds = cart.map(song => String(song._id));
        const session = await stripe.checkout.sessions.retrieve(
          req.session.stripeSession
        );

        req.session.stripeSession = '';
        BlackList.findOne({}, 'blackList', async (err, foundItem) => {
          try {
            foundItem.blackList = foundItem.blackList.filter(
              item => !songsIds.includes(item)
            );
            await foundItem.save();
          } catch (error) {
            res.redirect('/');
          }
        });
        next();
      }
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
};

exports.removeFromBlackList = async (req, res, next) => {
  const cart = req.session.cart;
  const songsIds = cart.map(song => String(song._id));
  try {
    if (!req.header('Referer')) {
      BlackList.findOne({}, 'blackList', async (err, foundItem) => {
        try {
          foundItem.blackList = foundItem.blackList.filter(
            item => !songsIds.includes(item)
          );
          console.log(foundItem.blackList);
          await foundItem.save();
          next();
        } catch (error) {
          res.redirect(req.header('Referer'));
        }
      });
    } else {
      next();
    }
  } catch (error) {
    res.redirect(req.header('Referer'));
  }
};
