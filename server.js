'use strict'

const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const movieRouter = require('./routes/movies')
// import route handlers
app.use(cors())
// fetch post req.body fields as JSON
app.use(express.json())
app.use(movieRouter)

// listening PORT
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log('Express, Mongoose API listening port: ', PORT)
})
