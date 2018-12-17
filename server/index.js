var axios = require('axios');
var router = require('./routes/movieRoutes');


var express = require('express');
var bodyParser = require('body-parser');
var request = require('request')
var app = express();
var axios = require('axios');

//Helpers
var apiHelpers = require('./helpers/apiHelpers.js');
//Middleware
app.use(bodyParser.json());
// Due to express, when you load the page, it doesn't make a get request to '/', it simply serves up the dist folder
app.use(express.static(__dirname + '/../client/dist'));
// app.use(axios);

//OPTION 1: Use regular routes
app.get('/search', (req, res) => {
  // get the search genre     
  router.get('/search', req)
    .then(movieList => {
      res.send(movieList);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    })
})

app.get('/test', (req, res) => {
  res.send('tested')
})

app.get('/favorites', (req, res) => {
  // get the search genre     
  router.get('/favorites', req)
    .then(favorites => {
      res.send(favorites);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    })
})

// https://www.themoviedb.org/account/signup
// use this endpoint to search for movies by genres, you will need an API key
// https://api.themoviedb.org/3/discover/movie
// and sort them by horrible votes using the search parameters in the API

app.get('/genres', function (req, res) {
  // make an axios request to get the list of official 

  router.get('/genres', (req, res => 
      
       res.send(genreList))
    .catch((err) => {
      res.status(404).send();
      console.log('Can\'t get genres\n', err);
    })
});



// use this endpoint, which will also require your API key: https://api.themoviedb.org/3/genre/movie/list
// send back

const user = {};

app.post('/save', (req, res) => {
  router.post('save', req);
  res.sendStatus(200)
});

app.post('/delete', (req, res) => {
  router.post('delete', req);
  res.sendStatus(200)
});

app.post('/user', function (req, res) {
  
  router.post('/user',Object.assign(user, req.body))
  .then(res.sendStatus(200))
  .catch(err=>{
    console.log(err);
    res.sendStatus(500).send('cant process username at this time')
  })
});

// app.get('/*', () => res.sendStatus(404));
//OPTION 2: Use Express Router
//IF you decide to go with this option delete OPTION 1 to continue
//Routes
// const movieRoutes = require('./routes/movieRoutes.js');
// //Use routes
// app.use('/movies', movieRoutes);


app.listen(3000, function () {
  console.log('listening on port 3000!');
});
