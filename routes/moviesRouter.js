const moviesRouter = require('express').Router();

const bodyParser = require('body-parser');

const { celebrate, Joi } = require('celebrate');

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movie');

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
    image: Joi.string().required().pattern(/^https?:\/\/([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?$/),
    trailerLink: Joi.string().required().pattern(/^https?:\/\/([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?$/),
    thumbnail: Joi.string().required().pattern(/^https?:\/\/([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?$/),
    owner: Joi.string().required().alphanum().pattern(/^[0-9a-fA-F]{24}$/),
    movieId: Joi.string().required().alphanum().pattern(/^[0-9a-fA-F]{24}$/),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);

moviesRouter.delete('movies/:movieId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().pattern(/^[0-9a-fA-F]{24}$/),
  }),
}), deleteMovie);

module.exports = moviesRouter;
