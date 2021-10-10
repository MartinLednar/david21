const mongoose = require('mongoose');

const publicBeatsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A beat must have a name'],
    unique: true,
    trim: true,
  },
  author: {
    type: String,
    default: 'David21',
    unique: false,
  },
  coAuthors: {
    type: [String],
    default: '',
  },
  price: {
    type: Number,
    required: true,
  },
  song: {
    file: { type: Buffer, required: true },
    mimetype: { type: String, required: true },
    filename: { type: String, required: true },
  },
});

const publicSong = mongoose.model('publicSong', publicBeatsSchema);

module.exports = publicSong;
