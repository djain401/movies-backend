'use strict'

const express = require('express')
const movieRouter = express.Router()

const {
  homeHandler,
  getMoviesFromAPI,
  searchMoviesFromAPI,
  getMovieDetailsFromAPI,
  getMoviesCastFromAPI,
  getMoviesFromDB,
  addMovie,
  deleteMovie
} = require('../controllers/movies')

movieRouter.get('/', homeHandler)
// get trending movies for the week from TMDB API
movieRouter.get('/moviesapi', getMoviesFromAPI)

// get movies from TMDB API based on search query
movieRouter.get('/searchmovies', searchMoviesFromAPI)

/// /get movies details from TMDB API based on id
movieRouter.get('/moviedetails', getMovieDetailsFromAPI)

// get movie cast by from api
movieRouter.get('/moviecast', getMoviesCastFromAPI)

// get favourite movies
movieRouter.get('/movies', getMoviesFromDB)

// add movie to favourites
movieRouter.post('/movies', addMovie)

// delete a movie from favourites
movieRouter.delete('/movies/:id', deleteMovie)

module.exports = movieRouter
