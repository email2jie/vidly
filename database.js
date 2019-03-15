const mongoose = require('mongoose');

function startMongoose(){
mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true})
  .then(() => console.log('Connected to MongoDB.......'))
  .catch((err) => console.log('error', err));
};

module.exports = startMongoose;

