import React, { Component } from 'react';
import { getMoviesInCollection } from '../../helpers/movies';
import PropTypes from 'prop-types';
// import { Typeahead } from 'react-bootstrap-typeahead';
import ImageLink from '../ImageLink/ImageLink';
import _ from 'lodash';

class Collection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: null,
      visibleMovies: null,
      selectedMovie: null,
    };
  }

  renderMovies = () => {
    if (this.state.visibleMovies) {
      console.log(this.state.visibleMovies);
      let sortedCollection = _.sortBy(this.state.visibleMovies, o => o.title);
      let movies = sortedCollection.map((data, index) => {
        const movie = data;
        return (
          <div className="col-md-2" key={index}>
            <ImageLink
              path={movie.poster_path}
              alt={`${movie.title} Thumbnail`}
              title={movie.title}
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

  // _handleChange = e => {
  //   console.log(e);
  //   if (e.length === 0) {
  //     visibleMovies: this.state.movies;
  //     return;
  //   }
  //   const id = e[0].id;
  //   const m = this.state.movies;
  //   const { checked, name } = e.target;
  //   console.log(checked, name);
  //   const l = _.filter(m, movie => movie.id === id);
  //   if (l.length === 0) {
  //     return;
  //   }
  //   console.log(m, l);
  //   this.setState({
  //     visibleMovies: l,
  //     selectedMovie: l,
  //   });
  // };

  _clearTypeahead = () => {
    this.setState({
      visibleMovies: this.state.movies,
      selectedMovie: [],
    });
  };

  async componentWillMount() {
    let movies;
    const { uid } = this.props.match.params;
    if (uid) {
      movies = await getMoviesInCollection(uid);
      this.setState({
        movies,
        visibleMovies: movies,
      });
      return;
    }
    if (this.props.user.uid) {
      movies = await getMoviesInCollection(this.props.user.uid);
      this.setState({
        movies,
        visibleMovies: movies,
      });
      return;
    }
  }

  render() {
    // let movies = [];
    // if (this.state.movies) {
    //   movies = this.state.movies.map((movie, index) => {
    //     return movie;
    //   });
    // } else {
    //   movies = [];
    // }
    return (
      <div className="container">
        <div className="row text-center pt-4">
          <div className="col">
            <h2>Movie Collection</h2>
          </div>
        </div>
        {/* <div className="row text-center pt-3">
          <div className="col-4 offset-md-4">
            <h4>Search Collection</h4>
            <Typeahead
              labelKey="title"
              options={movies}
              placeholder="Find movie..."
              minLength={3}
              emptyLabel="Movie not found."
              onChange={this._handleChange}
              onInputChange={this._handleChange}
              selected={this.state.selectedMovie}
              renderMenuItemChildren={movie =>
                <div>
                  <img
                    src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                    alt={movie.alt}
                    className="img-fluid"
                    style={{ maxWidth: 35, marginRight: 15 }}
                  />
                  {movie.title}
                </div>}
            />
            <button className="btn btn-primary" onClick={this._clearTypeahead}>
              Reset
            </button>
          </div>
        </div> */}
        <div className="row pt-4">
          {this.renderMovies()}
        </div>
      </div>
    );
  }
}

Collection.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
  user: PropTypes.object,
};

export default Collection;
