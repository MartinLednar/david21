const customBeat = require('../models/customBeatModel');
const publicBeat = require('../models/publicBeatModel');
const email = require('../utils/email');

exports.handlePayment = async (req, res) => {
  try {
    const songsFiles = [];
    const publicSongs = req.session.cart
      .filter(song => song.category === 'public')
      .map(song => song._id);

    const orderedSongs = req.session.cart
      .filter(song => song.category === 'custom')
      .map(song => song._id);

    if (publicSongs.length !== 0 && orderedSongs.length !== 0) {
      const songsPublic = await publicBeat.find(
        { _id: { $in: [...publicSongs] } },
        'song.filename song.file'
      );

      songsPublic.forEach(song => {
        songsFiles.push({
          filename: song.song.filename,
          content: song.song.file,
        });
      });

      publicBeat.deleteMany(
        { _id: { $in: [...publicSongs] } },
        (err, deletedSongs) => {
          if (err) {
            return res.redirect('https://beatsby21/');
          }
        }
      );

      //////////////Ordered songs/////////////

      const songsCustom = await customBeat.find(
        { _id: { $in: [...orderedSongs] } },
        'song.filename song.file'
      );

      songsCustom.forEach(song => {
        songsFiles.push({
          filename: song.song.filename,
          content: song.song.file,
        });
      });

      customBeat.deleteMany(
        { _id: { $in: [...orderedSongs] } },
        (err, deletedSongs) => {
          if (err) {
            return res.redirect('https://beatsby21/');
          }
        }
      );

      email.sendEmailSuccess({
        to: req.session.buyEmail,
        attachments: [...songsFiles],
      });

      email.sendEmailSuccessAuthor({
        client: req.session.buyEmail,
        items: [...songsFiles.map(item => item.filename)],
      });

      req.session.cart = null;
      return res.render('success', { buyEmail: req.session.buyEmail });
    }

    if (publicSongs.length !== 0 && orderedSongs.length === 0) {
      const songs = await publicBeat.find(
        { _id: { $in: [...publicSongs] } },
        'song.filename song.file'
      );

      songs.forEach(song => {
        songsFiles.push({
          filename: song.song.filename,
          content: song.song.file,
        });
      });

      publicBeat.deleteMany(
        { _id: { $in: [...publicSongs] } },
        (err, deletedSongs) => {
          if (err) {
            return res.redirect('https://beatsby21/');
          }
        }
      );

      email.sendEmailSuccess({
        to: req.session.buyEmail,
        attachments: [...songsFiles],
      });

      email.sendEmailSuccessAuthor({
        client: req.session.buyEmail,
        items: [...songsFiles.map(item => item.filename)],
      });

      req.session.cart = null;
      return res.render('success', { buyEmail: req.session.buyEmail });
    }

    if (publicSongs.length === 0 && orderedSongs.length !== 0) {
      const songs = await customBeat.find(
        { _id: { $in: [...orderedSongs] } },
        'song.filename song.file'
      );

      songs.forEach(song => {
        songsFiles.push({
          filename: song.song.filename,
          content: song.song.file,
        });
      });

      customBeat.deleteMany(
        { _id: { $in: [...orderedSongs] } },
        (err, deletedSongs) => {
          if (err) {
            return res.redirect('https://beatsby21/');
          }
        }
      );

      email.sendEmailSuccess({
        to: req.session.buyEmail,
        attachments: [...songsFiles],
      });

      email.sendEmailSuccessAuthor({
        client: req.session.buyEmail,
        items: [...songsFiles.map(item => item.filename)],
      });

      req.session.cart = null;
      return res.render('success', { buyEmail: req.session.buyEmail });
    }
  } catch (err) {
    res.redirect('https://beatsby21/');
  }
};
