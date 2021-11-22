exports.cartIsEmpty = (req, res, next) => {
  if (req.session.cart.length === 0) {
    res.redirect('/');
  } else {
    next();
  }
};
