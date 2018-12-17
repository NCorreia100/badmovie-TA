 const React=require ('react');
const ReactDOM =require('react-dom');
const $ = require('jquery');
// import AnyComponent from './components/filename.jsx'
const Search  =require('./components/Search.jsx');
const Movies =require('./components/Movies.jsx');
const Axios =require('axios');

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {     
        movies: [],        
        selectedGenre: null,
        favorites: [],
        showFavorite: false
      }
    
    // you might have to do something important here!
    this.getMovies = this.getMovies.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
  }

 

  getMovies(genre) {
    // make an axios request to your server on the GET SEARCH endpoint
    this.setState({ selectedGenre: genre });
     Axios.get('/genres')
      .then((movies)=> this.setState({'movies':movies}))
      .catch('error getting data from the server');    
  }

  saveMovie(movie) {
    // same as above but do something diff
    this.setState.favorites.push(movie);
    Axios.post('/save',movie).then(alert('Movie has been saved!'));
  }

  deleteMovie(movie) {
    // same as above but do something diff
    Axios.post('/delete',movie).then(alert('Movie has been deleted from favorites'));
  }

  swapFavorites() {
  //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    });
  }
  componentDidMount(){
    let userData = prompt('Please enter your username','password');
    Axios.post('/user:3000',userData);
  }
  render () {
  	return (
      <div className="app">
        <header className="navbar"><h1>Bad Movies</h1></header> 
        
        <div className="main">
          <Search swapFavorites={this.swapFavorites} showFaves={this.state.showFaves} getMovies={this.getMovies}/>
          <Movies movies={this.state.showFaves ? this.state.favorites : this.state.movies} 
                  showFaves={this.state.showFaves} saveMovie={this.saveMovie}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));