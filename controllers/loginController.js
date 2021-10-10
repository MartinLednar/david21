exports.renderSite = async (req, res) => {
  try {
    res.status(200).render('login');
  } catch (err) {
    console.log(err.message);
  }
};
