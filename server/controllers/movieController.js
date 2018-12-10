const movieModel = require('../models/movieModel.js');
const apiHelpers = require('../helpers/apiHelpers.js');
const { KEY } = require('../moviesAPI.js');
const promisify = require('bluebird');


const user = { username: null };
let genreSelected= null;
//Return requests to the client
module.exports = {
  getSearch: (req, res) => {
    // get the search genre 
    genreSelected = req.genre;   
    Axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${KEY}&language=en-US&query=${req.genre}&page=1&include_adult=false`)
      .then((movieList) => {
        console.log(movieList);
        let videos = movieList.results.map(video => {
          return {
            id: video.id,
            title: video.title,
            posterUrl: video.poster_path,
            releasedDate: video.release_date,
            rating: video.vote_average,
            overview: video.overview,
            voteCount: video.vote_count
          }
        });
        
        res.send(videos.slice(0, 9));
      })
      .catch((err) => {
        console.log('Can\'t get movie list\n', err);
        res.sendStatus(404);
      })
  },
  // https://www.themoviedb.org/account/signup
  // get your API KEY

  // use this endpoint to search for movies by genres, you will need an API key

  // https://api.themoviedb.org/3/discover/movie

  // and sort them by horrible votes using the search parameters in the API

  getGenres: (req, res) => {

    Axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${KEY}&language=en-US`)

      .then((genreList) => {
        console.log(genreList);
        res.send(genreList.map(genre => genre.name));
      }).catch((err) => {
        res.sendStatus(404);
        console.log('Can\'t get genres\n', err);
      });
  },
  // make an axios request to get the list of official genres

  // use this endpoint, which will also require your API key: https://api.themoviedb.org/3/genre/movie/list

  // send back
  getFavorites: (req, res) => {
    res.send(movieModel.getAllFavorites(user.userId))
  }

  , saveMovie: (req, res) => {
    Promise.promisify(movieModel.saveMovie(Object.assign(req),{genre:genre}), (err) => {
      if (err) console.log(err)
      movieModel.saveFavorite(req.movieId, req.userId);
      res.sendStatus(200);
    });

  },
  deleteMovie: (req, res) => {
    movieModel.deleteFavorite(req.movieId, req.userId);
    res.sendStatus(200);
  },

  processUser: (req, res) => {
    return Promise.promisify(movieModel.loadUser(req.username), (err, { userId, username, password, lastLogin }) => {
      if (username !== null) {
        Object.assign(user, {
          userId,
          username,
          password,
          lastLogin
        });
        res.send(user.username);
      } else {
        movieModel.saveNewUser(req.username);
      }
    })
      .then(processUser(req, res))
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      })


  }


}