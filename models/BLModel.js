const mongoose = require('mongoose');

const blackListSchema = new mongoose.Schema({
  blackList: { type: Array, default: [] },
});

const blackList = mongoose.model('blackList', blackListSchema);

module.exports = blacklist;
