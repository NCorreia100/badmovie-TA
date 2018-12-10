import React from 'react';
import axios from 'axios';

class Movies extends React.Component {
  constructor(props) {
    super(props)
    
    

  }
  
  // Make an onClick for each list item. If the movies shown is the search results, 
  // onClick add it to the database (do it in the main app, and pass down the function)

  // If you're currently showing the fave list, delete the movie instead
  // You can tell which list is currently being rendered based on whether the prop "showFaves" is false (search results) or true (fave list) (within index.jsx)

  render() {
    if (this.state.movies.length > 0) {
      return (
        <ul className="movies">

          {
            this.props.movies.map(movie => {
              return (
                <li className="movie_item">
                  <img src="https://lh3.googleusercontent.com/97gnjRiv2zIRnDupzfxYFoI-6zlIK3jKgb6KOCDf_tjWkY9epbITdSFIbiKhuccOqQ=w300" />
                  <div className="movie_description">
                    <h2>De Wae</h2>
                    <section className="movie_details">
                      <div className="movie_year">
                        <span className="title">Year</span>
                        <span>2018</span>
                      </div>
                      <div className="movie_rating">
                        <span className="title">Rating</span>
                        <span>10.0</span>
                        <link href='#' onClick={this.props.saveMovie(movie.id)}><strong>Save as favorite</strong></link>
                      </div>
                    </section>
                  </div>
                </li>
              )
            })
          }
        </ul>

      );
    } else {
      return (
        <h2 style="text-alignment: center; background-color: gray" ><strong>
          Select a genre first for list of movies to be displayed here
    </strong></h2>
      );
    }
  }
}

export default Movies;