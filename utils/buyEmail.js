exports.isBuyEmail = async (req, res, next) => {
  try {
    if (req.session?.buyEmail) {
      next();
    } else {
      res.redirect('https://beatsby21/pay-mail');
    }
  } catch (err) {
    res.redirect('https://beatsby21/pay-mail');
  }
};
