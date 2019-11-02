const mongoose = require('mongoose');

const VentaBoletoSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  fecha: {
      type:Date,
  },
  precio:{
      type:Number
  },
  cantidad:{
      type:Number,
      required: true
  },
  user_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
  },
  boleto_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'boleto'
  },
  funcion_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'funcion'
  }

});

module.exports = mongoose.model('venta_boleto', VentaBoletoSchema);