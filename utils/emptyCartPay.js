exports.cartIsEmpty = async (req, res, next) => {
  try {
    if (req.session.cart.length === 0) {
      res.redirect(req.header('Referer'));
    } else {
      return next();
    }
  } catch (error) {
    res.redirect('/');
  }
};
