import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state={
       genreList:[], 
     selectedGenre: null
    }
  }
  getGenres() {
    //make an axios request in this component to get the list of genres from your endpoint GET GENRES
    //---shouldn't we invoke a function from App that handles the axios reuqest instead?? --- 
    axios.get('/genres:3000').then((genreList)=>this.setState({genres:genreList}));
    
  }    
  componentDidMount(){
    this.getGenres();
  }

  render() {
    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>

        {/* Make the select options dynamic from genres !!! */}
        {/* How can you tell which option has been selected from here? */}

        <select>
          {
            this.state.genreList.map(genre=> (<option value="theway" onMouseRelease={this.setState({selectedGenre:genre})}>The Way</option>))
          }
        </select>
        <br/><br/>

        <button onClick={this.props.getMovies(this.state.selectedGenre)}>Search</button>

      </div>
    );
  }
}



export default Search;