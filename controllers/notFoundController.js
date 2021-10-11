exports.renderSite = async (req, res) => {
  try {
    res.status(200).render('notFound');
  } catch (err) {
    console.log(err.message);
  }
};
