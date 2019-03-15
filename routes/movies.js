const express = require("express");
const router = express.Router();
const { Movie, validateMovie } = require("../models/movie.js");
const { Genre } = require("../models/genre.js");

router.get("/", async (req, res) => {
  const result = await Movie.find().sort("name");
  res.send(result);
});

async function postItem(req, res) {
  const genres = await Genre.find({ _id: { $in: req.body.genres } });
  if (!genres) return res.status(400).send("Invalid genre.");
  const movie = new Movie({
    title: req.body.title,
    genre: genres,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });
  try {
    return await movie.save();
  } catch (e) {
    return e.message;
  }
}

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");
  res.send(movie);
});

router.post("/", async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const result = await postItem(req, res);
  res.send(result);
});

router.put("/:id", async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genres = await Genre.find({ _id: { $in: req.body.genres } });
  if (!genres) return res.status(400).send("Invalid genre.");
  const result = await Movie.findOneAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
        genre: genres,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
      }
    },
    { new: true }
  );
  if (!result)
    return res.status(404).send("The movie with the given ID was not found.");
  res.send(result);
});

router.delete("/:id", async (req, res) => {
  const result = await Movie.findByIdAndDelete(req.params.id);
  if (!result)
    return res.status(404).send("The movie with the given ID was not found.");
  res.send(result);
});

module.exports = router;
