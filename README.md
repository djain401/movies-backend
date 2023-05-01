# Sample trending movie explorer backend

This Node.js backend project provides a RESTful API for accessing the latest trending movies and their detailed information, including cast details, overview, ratings, and revenue.
Users can mark movies as favorites and view their personalized list of favorite movies.
The API also includes a search feature, allowing users to search for movies by title.
This project utilizes the Express.js framework and the MongoDB database.
Technical features of the project includes efficient data organization, separation of concerns, and modular code.

## Pre-requisites

- A development environment with below tools installed
  - [NodeJs](https://nodejs.org/en) latest stable version
  - [Docker](https://www.docker.com/) latest stable version
- Register and obtain a free API key from [The movie database](https://www.themoviedb.org/)

## Usage

- Clone the repository to your machine.
- Run mongodb locally using below docker command.

    ```console
    docker run --name movies-db -p 27017:27017 -d mongo:latest
    ```

- Install the npm dependencies using `npm install`.
- Setup `MONGO_URL` and `API_KEY` in `.env` file.
- Run the app in using `npm start`. APIs are accessible at <http://localhost:3001> by default.

The application works best with this [Trending movie frontend application](https://github.com/djain401/sample-todo-frontend).

This backend application can be tested through API clients
like [Postman](https://www.postman.com/) or [Thunder Client](https://www.thunderclient.com/).

## Security

- Update the CORS policy for the API server for better security.
- Use a library like [Helmet](https://helmetjs.github.io/) to set common security HTTP headers.

## Backlog

The project is currently just a minimum viable product
and needs below features developed to make it
useful for real-world use-cases.

- [ ] Authentication and authorization: Users can create an account and log in to access their personal favorite movies list. The API is designed to be secure and protect user data.
- [ ] Sorting: Users can sort movies by popularity, rating, release date, or title.
- [ ] Pagination: To improve performance, the API supports pagination, allowing users to fetch a subset of movies at a time.
- [ ] API documentation: The API includes detailed documentation for developers, including endpoints, parameters, and response formats.

## Acknowledgements

This project uses APIs from [The movie database](https://www.themoviedb.org/)
and as such complies with the [terms of use](https://www.themoviedb.org/documentation/api/terms-of-use) for TMDB.
