const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Admin = require('../models/adminModel');

const signToken = id => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.renderSite = async (req, res) => {
  try {
    res.status(200).render('login', {
      errMessage: undefined,
    });
  } catch (err) {
    res.redirect('/');
  }
};

exports.renderMenu = async (req, res) => {
  try {
    res.status(200).render('adminMenu');
  } catch (err) {
    res.redirect('/');
  }
};

exports.renderAdminMenu = async (req, res) => {
  try {
    //Encrypting password and creating admin//
    // bcrypt.genSalt(process.env.SALT_ROUNDS * 1, async function (err, salt) {
    //   if (!err) {
    //     bcrypt.hash(req.body.password, salt, async function (err, hash) {
    //       if (!err) {
    //         req.body.password = hash;
    //         await Admin.create(req.body);
    //       }
    //     });
    //   }
    // });
    // res.render('login', { errMessage: false });

    //Encrypting password and creating admin//
    // Checking for right email and password//
    Admin.find({}, async (err, admin) => {
      try {
        console.log(admin);
        if(!admin){
           bcrypt.genSalt(process.env.SALT_ROUNDS * 1, async function (err, salt) {
                    if (!err) {
                      bcrypt.hash(req.body.password, salt, async function (err, hash) {
                        if (!err) {
                          req.body.password = hash;
                          await Admin.create(req.body);
                        }
                      });
                    }
                  });
          res.render('login', { errMessage: false });
        }
        else if (admin[0].email === req.body.email) {
          bcrypt.compare(
            req.body.password.trim(),
            admin[0].password,
            (err, result) => {
              if (result) {
                const token = signToken(admin[0]._id);
                res.cookie('jwt', token, {
                  httpOnly: true,
                  secure: true,
                });
                res.render('adminMenu');
              } else {
                res.render('login', {
                  errMessage: true,
                });
              }
            }
          );
        } else {
          res.render('login', {
            errMessage: true,
          });
        }
      } catch (error) {
        res.render('login', {
          errMessage: true,
        });
      }
    });
    //Checking for right email and password//
  } catch (err) {
    res.render('login', {
      errMessage: true,
    });
  }
};
