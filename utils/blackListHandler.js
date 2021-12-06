const BlackList = require('../models/BLModel');
const stripe = require('stripe')(process.env.STRIPE_PROD_SECRET);

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
          res.redirect('https://beatsby21/shop');
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
  try {
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
  } catch (error) {
    res.redirect(req.header('Referer'));
  }
};

exports.handleBlackListOnSuccess = async (req, res, next) => {
  try {
    const cart = req.session.cart;
    const songsIds = cart.map(song => String(song._id));

    BlackList.findOne({}, async (err, foundItem) => {
      if (cart.length === 0) {
        res.redirect('/');
      } else if (!foundItem) {
        await BlackList.create({ blackList: [] });
        res.redirect('/');
      } else {
        const allOnBlackList = songsIds.every(song =>
          foundItem.blackList.includes(song)
        );

        if (allOnBlackList) {
          const session = await stripe.checkout.sessions.retrieve(
            req.session.stripeSession
          );

          if (session.status === 'complete') {
            req.session.stripeSession = '';

            foundItem.blackList = foundItem.blackList.filter(
              item => !songsIds.includes(item)
            );
            await foundItem.save();

            next();
          } else {
            res.redirect('https://beatsby21/');
          }
        } else {
          res.redirect('https://beatsby21/');
        }
      }
    });
  } catch (error) {
    res.redirect('https://beatsby21/');
  }
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
            return res.redirect('https://beatsby21/');
            console.log(error);
          }
        });
        next();
      }
    } else {
      next();
    }
  } catch (error) {
    res.redirect('https://beatsby21/');
    console.log(error);
  }
};

exports.removeFromBlackList = async (req, res, next) => {
  try {
    const cart = req.session.cart;
    const songsIds = cart.map(song => String(song._id));
    if (!req.header('Referer')) {
      BlackList.findOne({}, 'blackList', async (err, foundItem) => {
        try {
          foundItem.blackList = foundItem.blackList.filter(
            item => !songsIds.includes(item)
          );
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
