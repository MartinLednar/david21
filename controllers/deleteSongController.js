const mongoose = require('mongoose');
const customBeat = require('../models/customBeatModel');
const publicBeat = require('../models/publicBeatModel');

exports.renderDeletePublic = async (req, res) => {
  try {
    if (req.params?.categ && req.params?.id) {
      publicBeat.findByIdAndDelete(req.params.id, (err, deletedSong) => {
        res.redirect('https://beatsby21.com/delete');
      });
    } else if (req.query?.search && !req.params?.categ) {
      publicBeat.find({}, '-song', (err, songs) => {
        const searched = songs.filter(song =>
          song.name.includes(req.query.search.trim().toLowerCase())
        );

        res.render('delete', {
          foundItems: searched.reverse(),
          categ: 'public',
        });
      });
    } else {
      publicBeat.find({}, '-song', (err, songs) => {
        res.render('delete', { foundItems: songs.reverse(), categ: 'public' });
      });
    }
  } catch (err) {
    res.redirect('https://beatsby21.com/delete');
  }
};

exports.renderDeleteCustom = async (req, res) => {
  try {
    if (req.params?.categ && req.params?.id) {
      customBeat.findByIdAndDelete(req.params.id, (err, deletedSong) => {
        res.status(200).redirect('https://beatsby21.com/delete/ordered');
      });
    } else if (req.query?.search && !req.params?.categ) {
      customBeat.find({}, '-song -password', (err, songs) => {
        const searched = songs.filter(song =>
          song.name.includes(req.query.search.trim().toLowerCase())
        );

        res.render('delete', {
          foundItems: searched.reverse(),
          categ: 'ordered',
        });
      });
    } else {
      customBeat.find({}, '-song -password', (err, songs) => {
        res.render('delete', { foundItems: songs.reverse(), categ: 'ordered' });
      });
    }
  } catch (err) {
    res.redirect('https://beatsby21.com/delete');
  }
};
