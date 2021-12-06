const jwt = require('jsonwebtoken');
const { promisify } = require('util');

exports.loginJWT = async (req, res, next) => {
  try {
    if (!req.cookies.jwt) {
      return next();
    }
    const decoded = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRET
    );

    if (decoded.id) {
      return res.render('adminMenu');
    } else {
      return next();
    }
  } catch (err) {
    res.redirect('https://beatsby21.com/login');
  }
};

exports.menuJWT = async (req, res, next) => {
  try {
    if (!req.cookies.jwt) {
      return res.redirect('/login');
    }
    const decoded = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRET
    );

    if (decoded.id) {
      return res.render('adminMenu');
    } else {
      return res.render('login');
    }
  } catch (err) {
    res.redirect('https://beatsby21.com/login');
  }
};

exports.adminJWT = async (req, res, next) => {
  try {
    if (!req.cookies.jwt) {
      return res.redirect('https://beatsby21/login');
    }
    const decoded = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRET
    );

    if (decoded.id) {
      return next();
    }
  } catch (err) {
    res.redirect('https://beatsby21.com/login');
  }
};
