const mongoose = require('mongoose');
const publicBeat = require('../models/publicBeatModel');
const customBeat = require('../models/customBeatModel');

exports.sendSong = async (req, res) => {
  try {
    const { categ, id } = req.params;
    if (categ === 'public') {
      publicBeat.findById(id, 'song', (err, song) => {
        res.writeHead(200, {
          'Content-Type': song.song.mimetype,
          'Content-Length': song.song.file.length,
        });
        res.end(song.song.file);
      });
    } else {
      customBeat.findById(id, 'song', (err, song) => {
        res.writeHead(200, {
          'Content-Type': song.song.mimetype,
          'Content-Length': song.song.file.length,
        });
        res.end(song.song.file);
      });
    }
  } catch (err) {
    console.log(err);
  }
};
