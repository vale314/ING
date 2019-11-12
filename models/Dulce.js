const mongoose = require('mongoose');

const DulceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  idD:{
    type: Number,
    unique: true
  },
  cantidad: {
      type:Number,
  },
  precio:{
      type:Number
  },
  categoria:{
    type:String
  }

});

module.exports = mongoose.model('dulce', DulceSchema);