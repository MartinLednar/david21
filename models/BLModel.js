const mongoose = require('mongoose');

const blackListSchema = new mongoose.Schema({
  blackList: [String],
});

const blackList = mongoose.model('blackList', blackListSchema);

module.exports = blackList;
