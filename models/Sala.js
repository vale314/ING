const mongoose = require('mongoose');

const SalaSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('sala', SalaSchema);