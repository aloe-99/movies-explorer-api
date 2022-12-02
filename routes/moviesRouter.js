const moviesRouter = require('express').Router();

const bodyParser = require('body-parser');

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movie');

moviesRouter.use(bodyParser.json());
moviesRouter.use(bodyParser.urlencoded({ extended: true }));

moviesRouter.get('/', getMovies);

moviesRouter.post('/', createMovie);

moviesRouter.delete('movies/:movieId', deleteMovie);

module.exports = moviesRouter;
