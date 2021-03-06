const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
});
//Models
const Genre = new mongoose.model('Genre', genreSchema);

function validateGenre(genre){
  const schema = {
    name: Joi.string().required()
  }
  return Joi.validate(genre, schema);
}

module.exports.genreSchema = genreSchema;
module.exports.Genre  = Genre;
module.exports.validateGenre = validateGenre;
