exports.renderRules = (req, res) => {
  const categ = req.params.categ;

  if (categ === 'terms-of-service') {
    res.render('termsOfService');
  } else {
    res.render('privacyPolicy');
  }
};
