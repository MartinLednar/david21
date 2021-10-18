const bcrypt = require('bcrypt');
const saltRounds = Number(process.env.SALT_ROUNDS);

const Admin = require('../models/adminModel');

exports.renderSite = async (req, res) => {
  try {
    res.status(200).render('login', {
      errMail: undefined,
      errPassword: undefined,
    });
  } catch (err) {
    console.log(err.message);
  }
};

exports.renderMenu = async (req, res) => {
  try {
    res.status(200).render('adminMenu');
  } catch (err) {
    console.log(err.message);
  }
};

exports.renderAdminMenu = async (req, res) => {
  try {
    //Encrypting password and creating admin//
    // bcrypt.genSalt(saltRounds, async function (err, salt) {
    //   if (!err) {
    //     bcrypt.hash(req.body.password, salt, async function (err, hash) {
    //       if (!err) {
    //         req.body.password = hash;
    //         const newAdmin = await Admin.create(req.body);
    //       }
    //     });
    //   }
    // });
    //Encrypting password and creating admin//
    //Checking for right email and password//
    // Admin.find({}, async (err, admin) => {
    //   if (admin[0].email === req.body.email) {
    //     bcrypt.compare(
    //       req.body.password.trim(),
    //       admin[0].password,
    //       (err, result) => {
    //         if (result) {
    //           res.redirect('/login/admin');
    //         } else {
    //           console.log(err);
    //           res.render('login', {
    //             errMail: undefined,
    //             errPassword: 'section-input-wrong',
    //           });
    //         }
    //       }
    //     );
    //   } else {
    //     res.render('login', {
    //       errMail: 'section-input-wrong',
    //       errPassword: undefined,
    //     });
    //   }
    // });
    //Checking for right email and password//
  } catch (err) {
    console.log(err.message);
  }
};
