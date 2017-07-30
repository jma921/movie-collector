import React, { Component } from 'react';
import { getMoviesInCollection } from '../../helpers/movies';
import ImageLink from '../ImageLink/ImageLink';
import _ from 'lodash';

class Collection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: null,
    };
  }

  renderMovies = () => {
    if (this.state.movies) {
      let sortedCollection = _.sortBy(this.state.movies, o => o.data.title);
      let movies = sortedCollection.map((data, index) => {
        const movie = data.data;
        return (
          <div className="col-md-2" key={index}>
            <ImageLink
              path={movie.poster_path}
              alt={`${movie.title} Thumbnail`}
              title={movie.title}
              rating={movie.vote_average}
              releaseDate={movie.release_date}
              to={`/movie/${movie.id}`}
            />
          </div>
        );
      });
      return movies;
    } else {
      return '';
    }
  };

  async componentWillMount() {
    const movies = await getMoviesInCollection(this.props.user.uid);
    console.log(movies);
    this.setState({
      movies,
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row text-center pt-4">
          <div className="col">
            <h2>Movie Collection</h2>
          </div>
        </div>
        <div className="row pt-4">
          {this.renderMovies()}
        </div>
      </div>
    );
  }
}

export default Collection;
