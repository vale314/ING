const mongoose = require('mongoose');

const BoletoSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  funcion_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'funcion'
},
});

module.exports = mongoose.model('boleto', BoletoSchema);