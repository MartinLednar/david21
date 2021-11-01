const bcrypt = require('bcrypt');
const saltRounds = Number(process.env.SALT_ROUNDS);
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
  },
  coAuthors: {
    type: [String],
    default: '',
  },
  category: {
    type: String,
    default: 'custom',
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

customBeatsSchema.pre('save', async function (next) {
  //Setting Name and Co-authors
  this.name = this.name.toLowerCase();
  console.log(this.coAuthors);
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

  next();
});

const customSong = mongoose.model('customSong', customBeatsSchema);

module.exports = customSong;
