const bcrypt = require('bcrypt');
const saltRounds = Number(process.env.SALT_ROUNDS);

const email = require('../utils/email');

const customSong = require('../models/customBeatModel');
const publicSong = require('../models/publicBeatModel');

exports.renderSite = async (req, res) => {
  try {
    res.status(200).render('add', { errMessage: false });
  } catch (err) {
    res.redirect('https://beatsby21/login');
  }
};

exports.addSong = async (req, res) => {
  try {
    req.body.song = {
      file: req.file.buffer,
      mimetype: req.file.mimetype,
      filename: `${req.body.name} - ${req.body.songNumber}.mp3`,
    };

    if (req.body?.email && req.body?.password) {
      //Send mail befor encryption//
      email.sendEmailInShop({
        to: req.body.email.trim(),
        code: req.body.password,
      });
      //Send mail befor encryption//

      // //Encrypting password//
      bcrypt.genSalt(saltRounds, async function (err, salt) {
        try {
          if (!err) {
            bcrypt.hash(req.body.password, salt, async function (err, hash) {
              try {
                if (!err) {
                  req.body.password = hash;
                  await customSong.create(req.body);
                }
              } catch (err) {
                res.render('add', { errMessage: true });
              }
            });
          }
        } catch (error) {
          res.render('add', { errMessage: true });
        }
      });
      // //Encrypting password//

      res.status(200).render('add', { errMessage: false });
    } else {
      await publicSong.create(req.body);

      res.status(200).render('add', { errMessage: false });
    }
  } catch (err) {
    res.render('add', { errMessage: true });
  }
};
