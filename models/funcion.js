const mongoose = require('mongoose');

const FuncionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  fecha: {
      type:Date,
  },
  hora: {
      type:Date
  },
  precio:{
      type:Number
  },
  pelicula_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'pelicula'
  },
  admin_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'administrador'
  },
  sala_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'sala'
  }

});

module.exports = mongoose.model('funcion', FuncionSchema);