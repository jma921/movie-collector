import React, { Component } from 'react';
import { getMoviesInCollection } from '../../helpers/movies';
import ImageLink from '../ImageLink/ImageLink';
import _ from 'lodash';

class Collections extends Component {
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
              to={`/movies/${movie.id}`}
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
    let movies;
    const { uid } = this.props.match.params;
    console.log(uid);
    if (uid) {
      movies = await getMoviesInCollection(uid);
      this.setState({
        movies,
      });
      return;
    }
    if (this.props.user.uid) {
      movies = await getMoviesInCollection(this.props.user.uid);
      this.setState({
        movies,
      });
      return;
    }
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

export default Collections;
