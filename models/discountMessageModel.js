const mongoose = require('mongoose');

const discountMessageSchema = new mongoose.Schema({
  message: {
    type: String,
    trim: true,
  },
});

discountMessageSchema.pre('save', function (next) {
  //Setting Name and Co-authors
  if (this.message) {
    this.message = this.message[0].toUpperCase() + this.message.slice(1);
  }
  //Setting Name and Co-authors

  next();
});

const discMessage = mongoose.model('discMessage', discountMessageSchema);

module.exports = discMessage;
