const mongoose = require('mongoose');

const VentaDulceriaSchema = mongoose.Schema({
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
  producto_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'boleto'
  },
  vendedor_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'funcion'
  }

});

module.exports = mongoose.model('venta_dulceria', VentaDulceriaSchema);