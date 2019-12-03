const mongoose = require('mongoose');

const VentaBoletoSchema = mongoose.Schema({
  pelicula_name: {
    type: String,
    required: true
  },
  fecha: {
      type:Date,
      default: Date.now()
  },
  precioT:{
      type:Number
  },
  cantidad:{
      type:Number,
      required: true
  },
  pelicula_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'funcion'
  },
  funcion_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'funcion'
  },
  horario:{
    type: String,
    default: '',
  },
  sala_num:{
    type: String,
    required: true
  },
  precio:{
    type:Number
  },
});

module.exports = mongoose.model('venta_boleto', VentaBoletoSchema);