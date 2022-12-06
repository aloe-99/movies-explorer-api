const moviesRouter = require('express').Router();

const bodyParser = require('body-parser');

const { celebrate, Joi } = require('celebrate');

const validator = require('validator');

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movie');

const { cirillicRegExp, latinRegExp } = require('../utils/regExp');

moviesRouter.use(bodyParser.json());
moviesRouter.use(bodyParser.urlencoded({ extended: true }));

moviesRouter.get('/', getMovies);

moviesRouter.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле image заполнено некорректно');
    }),
    trailerLink: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле trailerLink заполнено некорректно');
    }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле thumbnail заполнено некорректно');
    }),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required().pattern(cirillicRegExp),
    nameEN: Joi.string().required().pattern(latinRegExp),
  }),
}), createMovie);

moviesRouter.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.number(),
  }),
}), deleteMovie);

module.exports = moviesRouter;
