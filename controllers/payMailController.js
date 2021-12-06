exports.renderSite = (req, res) => {
  if (req.session?.buyEmail) {
    res.render('addBuyEmail', { addedEmail: req.session.buyEmail });
  } else {
    res.render('addBuyEmail', { addedEmail: undefined });
  }
};

exports.setBuyEmail = (req, res) => {
  req.session.buyEmail = req.body.buyEmail;
  res.redirect('https://beatsby21.com/pay-mail');
};
