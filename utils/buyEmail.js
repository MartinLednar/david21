exports.isBuyEmail = async (req, res, next) => {
  try {
    if (req.session?.buyEmail) {
      next();
    } else {
      res.redirect('/pay-mail');
    }
  } catch (err) {
    res.redirect('/pay-mail');
  }
};
