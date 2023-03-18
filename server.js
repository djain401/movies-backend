"use strict";

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
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
 * Database stuff
 * collection products is in test
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
  const url = "https://random-d.uk/api/v2/random";
  try {
    console.log("test");
    let movieData = await axios.get("https://random-d.uk/api/v2/random");
    console.log(movieData);
    res.status(200).send(movieData.data);
  } catch (e) {
    res.status(500).send(e.movieData.data);
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

  let newTask = await movieModel.create({
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
    // send all tasks back
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
// get all movies from TMDB API based on search query
app.get("/moviesapi", getMoviesFromAPI);

//gto favourite movies
app.get("/movies", getMoviesFromDB);

// add movie to favourites
app.post("/movies", addMovie);

// delete a movie from favourites
app.delete("/movies/:id", deleteMovie);
