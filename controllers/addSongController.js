const bcrypt = require('bcrypt');
const saltRounds = Number(process.env.SALT_ROUNDS);

const email = require('../utils/email');

const customSong = require('../models/customBeatModel');
const publicSong = require('../models/publicBeatModel');

exports.renderSite = async (req, res) => {
  try {
    res.status(200).render('add');
  } catch (err) {
    console.log(err.message);
  }
};

exports.addSong = async (req, res) => {
  try {
    req.body.song = {
      file: req.file.buffer,
      mimetype: req.file.mimetype,
      filename: req.file.originalname,
    };

    if (req.body?.email && req.body?.password) {
      //Send mail befor encryption//
      email.sendEmailBuy({
        to: req.body.email.trim(),
        code: req.body.password,
        attachments: [
          {
            filename: req.body.song.filename,
            content: req.body.song.file,
          },
        ],
      });
      //Send mail befor encryption//

      // //Encrypting password//
      bcrypt.genSalt(saltRounds, async function (err, salt) {
        if (!err) {
          bcrypt.hash(req.body.password, salt, async function (err, hash) {
            if (!err) {
              req.body.password = hash;
              await customSong.create(req.body);
            }
          });
        }
      });
      // //Encrypting password//

      res.status(200).render('add');
    } else {
      await publicSong.create(req.body);
      res.status(200).render('add');
    }
  } catch (err) {
    console.log(err.message);
  }
};
