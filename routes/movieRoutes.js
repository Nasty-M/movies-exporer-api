const movieRouter = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { createMovieValidator, deleteMoviesValidator } = require('../middlewares/validation');

movieRouter.get('/movies', getMovies);

movieRouter.post('/movies', createMovieValidator, createMovie);

movieRouter.delete('/movies/:movieId', deleteMoviesValidator, deleteMovie);

module.exports = movieRouter;
