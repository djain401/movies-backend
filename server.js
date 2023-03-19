"use strict";

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();
// import route handlers

const app = express();
app.use(cors());
// fetch post req.body fields as JSON
app.use(express.json());

const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log("Express, Mongoose API listening port: ", PORT);
});

/***
 * Database related code
 */

mongoose.connect("mongodb://localhost:27017/MyMovies", {
  //useNewUrlParser: true,
  //strictQuery: false
});

// create a schema

const movieSchema = new mongoose.Schema({
  apiId: Number,
  title: String,
  imageUrl: String,
  overview: String,
  releaseDate: String,
});

const movieModel = mongoose.model("movies", movieSchema);

function homeHandler(req, res) {
  res.status(200).send("Home");
}

const getMoviesFromAPI = async (req, res) => {
  const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.API_KEY}`;
  try {
    let movieData = await axios.get(url);
    res.status(200).send(movieData.data);
  } catch (e) {
    res.status(500).send(e);
  }
};

const searchMoviesFromAPI = async (req, res) => {
  const query = req.query.query;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=en-US&query=${query}&include_adult=false`;
  try {
    let movieData = await axios.get(url);
    res.status(200).send(movieData.data);
  } catch (e) {
    res.status(500).send(e);
  }
};

const getMovieDetailsFromAPI = async (req, res) => {
  const id = req.query.id;
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=en-US`;
  try {
    let movieData = await axios.get(url);
    res.status(200).send(movieData.data);
  } catch (e) {
    res.status(500).send(e);
  }
};

const getMoviesFromDB = async (req, res) => {
  try {
    const moviesArray = await movieModel.find({});
    res.status(200).send(moviesArray);
  } catch (error) {
    console.error("DB error: " + error);
  }
};

const addMovie = async (req, res) => {
  const { apiId, title, imageUrl, overview, releaseDate } = req.body;

  let newMovie = await movieModel.create({
    apiId,
    title,
    imageUrl,
    overview,
    releaseDate,
  });

  // add movies to favourites
  // including one just added.
  try {
    const moviesArray = await movieModel.find({});
    res.status(200).send(moviesArray);
  } catch (error) {
    console.error("DB error: " + error);
  }
};

const deleteMovie = async (req, res) => {
  const id = req.params.id;

  try {
    await movieModel.findByIdAndDelete(id);

    let moviesArray = await movieModel.find({});
    res.status(200).json({
      message: "Successfully deleted.",
      moviesArray,
    });
  } catch (err) {
    res.json({
      message: `${err} - MongoDB delete issue`,
    });
  }
};

app.get("/", homeHandler);
// get trending movies foe the week from TMDB API
app.get("/moviesapi", getMoviesFromAPI);

//get movies from TMDB API based on search query
app.get("/searchmovies", searchMoviesFromAPI);

////get movies details from TMDB API based on id
app.get("/moviedetails", getMovieDetailsFromAPI);

//get favourite movies
app.get("/movies", getMoviesFromDB);

// add movie to favourites
app.post("/movies", addMovie);

// delete a movie from favourites
app.delete("/movies/:id", deleteMovie);
