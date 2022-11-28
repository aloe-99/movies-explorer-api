const express = require('express');

const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const app = express();

const usersRouter = require('./routes/usersRouter')
const moviesRouter = require('./routes/moviesRouter')

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use('/users', usersRouter);

app.use('/movies', moviesRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});