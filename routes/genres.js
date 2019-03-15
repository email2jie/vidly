const express = require('express');
const router = express.Router();
const {Genre, validateGenre} = require('../models/genres.js');
//models


router.get('/', async (req, res) => {
  const result = await Genre.find();
  res.send(result);
});

async function postGenre(req){
  const genre = new Genre({
    name: req.body.name
  });
  try {
    await genre.save();
    return genre;
  } catch (e) {
    return e.message;
  }
}

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
});

router.post('/', async (req, res) => {
  const { error } = validateGenre(req.body);
  if(error){
    return res.status(400).send(error.details[0].message);
  }
  const result = await postGenre(req)
  res.send(result);
});

router.put('/:id', async (req, res) => {
  const { error } = validateGenre(req.body);
  if(error) return res.status(400).send(error.details[0].message);
  const result = await Genre.findOneAndUpdate(req.params.id,
    {
      $set: {name: req.body.name}
    }, {new: true}
  );
  if(!result) return res.status(404).send('The genre with the given ID was not found.');

  res.send(result);

});

router.delete('/:id', async (req, res) => {
  const result = await Genre.deleteOne({ _id: req.params.id });
  if(!result) return res.status(404).send('The genre with the given ID was not found.');
  res.send(result);
});


module.exports = router;
