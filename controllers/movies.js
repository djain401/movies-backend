'use strict'

const axios = require('axios')
const movieModel = require('../models/movies')

function homeHandler (req, res) {
  res.status(200).send('Home')
}

const getMoviesFromAPI = async (req, res) => {
  const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.API_KEY}`
  try {
    const movieData = await axios.get(url)
    res.status(200).send(movieData.data)
  } catch (e) {
    res.status(500).send(e)
  }
}

const searchMoviesFromAPI = async (req, res) => {
  const query = req.query.query
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=en-US&query=${query}&include_adult=false`
  try {
    const movieData = await axios.get(url)
    res.status(200).send(movieData.data)
  } catch (e) {
    res.status(500).send(e)
  }
}

const getMovieDetailsFromAPI = async (req, res) => {
  const id = req.query.id
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=en-US`
  try {
    const movieData = await axios.get(url)
    res.status(200).send(movieData.data)
  } catch (e) {
    res.status(500).send(e)
  }
}

const getMoviesCastFromAPI = async (req, res) => {
  const id = req.query.id
  const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.API_KEY}&language=en-US`
  try {
    const movieData = await axios.get(url)
    res.status(200).send(movieData.data)
  } catch (e) {
    res.status(500).send(e)
  }
}

const getMoviesFromDB = async (req, res) => {
  try {
    const moviesArray = await movieModel.find({})
    res.status(200).send(moviesArray)
  } catch (error) {
    console.error('DB error: ' + error)
  }
}

const addMovie = async (req, res) => {
  const { id, title, posterPath, overview, releaseDate } = req.body
  try {
    await movieModel.create({
      id,
      title,
      posterPath,
      overview,
      releaseDate
    })
  } catch (e) {
    console.log('Movie already exists in the database: ' + e)
  }

  // add movies to favourites
  // including one just added.
  try {
    const moviesArray = await movieModel.find({})
    res.status(200).send(moviesArray)
  } catch (error) {
    console.error('DB error: ' + error)
  }
}

const deleteMovie = async (req, res) => {
  const id = req.params.id

  try {
    await movieModel.findByIdAndDelete(id)

    const moviesArray = await movieModel.find({})
    res.status(200).json({
      message: 'Successfully deleted.',
      moviesArray
    })
  } catch (err) {
    res.json({
      message: `${err} - MongoDB delete issue`
    })
  }
}

module.exports = {
  homeHandler,
  getMoviesFromAPI,
  searchMoviesFromAPI,
  getMovieDetailsFromAPI,
  getMoviesCastFromAPI,
  getMoviesFromDB,
  addMovie,
  deleteMovie
}
