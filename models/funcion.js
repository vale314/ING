const mongoose = require('mongoose');

const FuncionSchema = mongoose.Schema({
  horario:{
    type: String,
    default: '',
    required: true
  },
  fecha: {
      type:Date,
      default: Date.now()
  },
  precio:{
      type:Number
  },
  pelicula_name:{
    type: String,
    default:'',
    required: true
  },
  sala_num:{
    type: String,
    required: true
  },
  boletos:{
    type: Number,
    default: 50
  },
  pelicula_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'funcion'
  }

});

module.exports = mongoose.model('funcion', FuncionSchema);