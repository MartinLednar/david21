exports.handlePayment = (req, res) => {
  req.session.cart = null;
  res.render('success', { buyEmail: req.session.buyEmail });
};
