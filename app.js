require('dotenv').config();

const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const { celebrate, Joi, errors } = require('celebrate');

const { PORT = 3000, MOVIESDB } = process.env;

const app = express();

const usersRouter = require('./routes/usersRouter');
const moviesRouter = require('./routes/moviesRouter');

const { createUser, login } = require('./controllers/user');

const auth = require('./middlewares/auth');

const errorHandler = require('./middlewares/errorHandler');
const NotFoundError = require('./errors/NotFoundError');

const { requestLogger, errorLogger } = require('./middlewares/logger');

// mongodb://localhost:27017/moviesdb
mongoose.connect(MOVIESDB, {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);

app.use(auth);

app.use('/users', usersRouter);

app.use('/movies', moviesRouter);

app.use('*', (req, res) => {
  throw new NotFoundError('Запрашиваемый объект не неайден');
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
