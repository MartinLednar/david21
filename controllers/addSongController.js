const bcrypt = require('bcrypt');
const saltRounds = Number(process.env.SALT_ROUNDS);

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
    console.log(req.body);
    req.body.song = {
      file: req.file.buffer,
      mimetype: req.file.mimetype,
      filename: req.file.originalname,
    };

    //Setting text//
    req.body.name = req.body.name.toLowerCase();
    if (req.body.coAuthors !== '') {
      const coAuthors = req.body.coAuthors.split(',');

      const coAuthorsCapitalized = coAuthors.map(auth => {
        auth = auth.trim();
        return auth[0].toUpperCase() + auth.slice(1);
      });
      req.body.coAuthors = coAuthorsCapitalized;
    }
    //Setting text//

    if (req.body?.email && req.body?.password) {
      //Encrypting password//
      bcrypt.genSalt(saltRounds, async function (err, salt) {
        if (!err) {
          bcrypt.hash(req.body.password, salt, async function (err, hash) {
            if (!err) {
              req.body.password = hash;

              const newSong = await customSong.create(req.body);
            }
          });
        }
      });
      //Encrypting password//

      res.status(200).render('add');
    } else {
      const newPublicSong = await publicSong.create(req.body);
      res.status(200).render('add');
    }
  } catch (err) {
    console.log(err.message);
  }
};
