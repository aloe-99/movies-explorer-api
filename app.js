require('dotenv').config();

const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const { errors } = require('celebrate');

const { PORT = 3000, MOVIES_DB = 'mongodb://localhost:27017/moviesdb' } = process.env;

const app = express();

const router = require('./routes/index');

const CORS = require('./middlewares/CORS');

const errorHandler = require('./middlewares/errorHandler');

const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect(MOVIES_DB, { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(CORS);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
