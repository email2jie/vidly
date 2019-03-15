
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true})
  .then(() => console.log('Connected to MongoDB.......'))
  .catch((err) => console.log('error', err));

//Schemas
const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
});

const customerSchema = new mongoose.Schema({
  name: {type: String, required: true, maxlength: 255},
  phone: {type: String, required: true},
  isGold: {type: Boolean, default: false, required: true}

})

//Models
const Genre = new mongoose.model('Genre', genreSchema);
const Customer = new mongoose.model('Customer', customerSchema);


module.exports = {Genre, Customer};
