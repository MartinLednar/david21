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
  },
  category: {
    type: String,
    default: 'public',
  },
  description: {
    type: String,
    trim: true,
  },
  songNumber: {
    type: Number,
    unique: true,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  song: {
    file: { type: Buffer, required: true },
    mimetype: { type: String, required: true },
    filename: { type: String, required: true },
  },
});

publicBeatsSchema.pre('save', function (next) {
  //Setting Name and Co-authors
  this.name = this.name.toLowerCase();
  if (this.coAuthors[0] !== '') {
    const coAuthors = this.coAuthors[0].split(',');

    const coAuthorsCapitalized = coAuthors.map(auth => {
      auth = auth.trim();
      return auth[0].toUpperCase() + auth.slice(1);
    });
    this.coAuthors = coAuthorsCapitalized;
  } else {
    this.coAuthors = undefined;
  }
  //Setting Name and Co-authors

  ///Description
  const descriptionLowercase = this.description.toLowerCase();
  this.description =
    descriptionLowercase[0].toUpperCase() + descriptionLowercase.slice(1);
  ///Description

  next();
});

const publicSong = mongoose.model('publicSong', publicBeatsSchema);

module.exports = publicSong;
