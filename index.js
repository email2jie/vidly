const express = require('express');
const app = express();
const genres = require('./routes/genres');
const home = require('./routes/home');
const customers = require('./routes/customers');
const startMongoose = require('./database.js');



app.use(express.json());
app.use('/', home);
app.use('/api/genres', genres);
app.use('/api/customers', customers);


startMongoose();
const port = process.env.PORT || 3000;
app.listen(port, ()=>{console.log(`Listening on port ${port}...`)});

