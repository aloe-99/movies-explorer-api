require('dotenv').config();

const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;

const app = express();

const usersRouter = require('./routes/usersRouter');
const moviesRouter = require('./routes/moviesRouter');

const { createUser, login } = require('./controllers/user');

const auth = require('./middlewares/auth');

const errorHandler = require('./middlewares/errorHandler');
const NotFoundError = require('./errors/NotFoundError');

const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/users', usersRouter);

app.use('/movies', moviesRouter);

app.use('*', (req, res) => {
  throw new NotFoundError('Запрашиваемый объект не неайден');
});

app.use(errorLogger);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
