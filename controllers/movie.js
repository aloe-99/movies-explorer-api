const Movie = require('../models/movie');

const NotFoundError = require('../errors/NotFoundError');

const BadRequestError = require('../errors/BadRequestError');

const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  })
    .then((movies) => res.send(movies))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const user = req.user._id;
  Movie.findByIdAndRemove(req.params.movieId)
    .orFail(new NotFoundError('Запрашиваемый объект не найден'))
    .then((movie) => {
      const owner = movie.owner.toString();
      if (owner === user) {
        Movie.findByIdAndRemove(movieId)
          .then((movies) => res.send(movies))
          .catch(next);
      } else {
        next(new ForbiddenError('Доступ к запрашиваемому ресурсу заблокирован'));
      }
    })
    .catch(next);
};
