const mongoose = require('mongoose');

const customBeatsSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'A custom beat must have a mail'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'A custom beat must have a password'],
    trim: true,
  },
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
    trim: true,
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

const customSong = mongoose.model('customSong', customBeatsSchema);

module.exports = customSong;
