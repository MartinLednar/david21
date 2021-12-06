exports.renderSite = async (req, res) => {
  try {
    res.status(200).render('notFound');
  } catch (err) {
    res.redirect('https://beatsby21/');
  }
};
