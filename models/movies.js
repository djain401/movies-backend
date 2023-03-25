"use strict";

const mongoose = require("./index.js");

const movieSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  title: String,
  poster_path: String,
  overview: String,
  release_date: String,
});

const movieModel = mongoose.model("movies", movieSchema);

module.exports = movieModel;
