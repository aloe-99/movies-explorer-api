const moviesRouter = require('express').Router();

const {
  getMovies, createMovie, deleteMovie
} = require('../controllers/movie.js');

moviesRouter.get('/', getMovies);

moviesRouter.post('/', createMovie);

moviesRouter.delete('movies/:movieId', deleteMovie);

module.exports = moviesRouter;