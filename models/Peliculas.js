const mongoose = require('mongoose');

const PeliculaSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  foto: {
    type: String,
    required
  },
  trailer:{
      type:String,
  },
  duracion:{
      type: String,
      required: true
  },
  sinapsis: {
    type:String,
    required : true
  },
  rating:{
    type:Number,
  },
  director:{
      type:String,
      required: true
  },
  categoria:{
      type:String,
      required: true
  },
  ano:{
      type: Date
  },
  admin_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'administrador'
  }
});

module.exports = mongoose.model('pelicula', PeliculaSchema);