const mongoose = require('mongoose');

const PeliculaSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  foto: {
    type: String,
    required: true
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
  }
});

module.exports = mongoose.model('pelicula', PeliculaSchema);