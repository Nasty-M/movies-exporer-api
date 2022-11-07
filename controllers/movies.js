const Movie = require('../models/movie');
const NotFound = require('../errors/NotFound');
const CastomizeError = require('../errors/CastomizeError');
const Forbidden = require('../errors/Forbidden');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => {
      res.send(movie);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new CastomizeError('Данные некорректны'));
      } else {
        next(error);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw new NotFound('Фильм не найден');
    })
    .then((currentMovie) => {
      if (currentMovie.owner === req.user._id) {
        Movie.findByIdAndRemove(req.params.movieId)
          .then(() => res.send({ message: 'Фильм удален успешно' }))
          .catch(next);
      } else {
        next(new Forbidden('Выбранный фильм удалить невозможно. Вы не добавляли его в сохраненные'));
      }
    })
    .catch(next);
};

module.exports = { getMovies, createMovie, deleteMovie };
