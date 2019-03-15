const mongoose = require("mongoose");
const Joi = require("joi");
const { genreSchema } = require("./genres.js");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 255 },
  genre: { type: [genreSchema], required: true },
  numberInStock: { type: Number, default: 0 },
  dailyRentalRate: { type: Number, default: 0 }
});

const Movie = new mongoose.model("Movie", movieSchema);

function validateMovie(movie) {
  const schema = {
    title: Joi.string()
      .max(255)
      .required(),
    genres: Joi.array().items(Joi.string()),
    numberInStock: Joi.number().min(0),
    dailyRentalRate: Joi.number().min(0)
  };
  return Joi.validate(movie, schema);
}

module.exports.movieSchema = movieSchema;
module.exports.Movie = Movie;
module.exports.validateMovie = validateMovie;
