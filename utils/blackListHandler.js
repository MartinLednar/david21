const BlackList = require('../models/BLModel');

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
