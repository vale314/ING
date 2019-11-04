const mongoose = require('mongoose');

const DulceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
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
  },

  admin_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'administrador'
  },

});

module.exports = mongoose.model('dulce', DulceSchema);