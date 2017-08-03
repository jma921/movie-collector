import React, { Component } from 'react';
import { addMovie, findMovieById, removeMovie } from '../../helpers/movies';

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null,
      video: null,
      inCollection: null,
    };
  }

  addMovie = () => {
    addMovie(this.state.movie, this.props.user.uid);
    this.setState({
      inCollection: true,
    });
  };

  removeMovie = () => {
    removeMovie(this.state.movie, this.props.user.uid);
    this.setState({
      inCollection: false,
    });
  };

  async componentDidMount() {
    const movieUrl = `https://api.themoviedb.org/3/movie/${this.props.match
      .params.id}?api_key=${process.env.REACT_APP_MOVIE_DB_KEY}&language=en-US`;
    const videoUrl = `https://api.themoviedb.org/3/movie/${this.props.match
      .params.id}/videos?api_key=${process.env
      .REACT_APP_MOVIE_DB_KEY}&language=en-US`;
    const movieResponse = await fetch(movieUrl);
    const videoResponse = await fetch(videoUrl);
    const movie = await movieResponse.json();
    const video = await videoResponse.json();
    if (!this.props.user) {
      this.setState({
        movie,
        video,
        inCollection: false,
      });
      return;
    }
    const inCollection = await findMovieById(movie.id, this.props.user.uid);
    this.setState({
      movie,
      video,
      inCollection,
    });
  }

  render() {
    const url = 'https://image.tmdb.org/t/p/';
    let genres = null;
    if (this.state.movie) {
      genres = this.state.movie.genres.map((name, index) => {
        if (index < this.state.movie.genres.length - 1) {
          return (
            <span key={index}>
              {name.name},
            </span>
          );
        } else {
          return (
            <span key={index}>
              {name.name}
            </span>
          );
        }
      });
    }

    return (
      <div style={{ width: '100%' }}>
        {this.state.movie
          ? <div
              className=""
              style={{
                backgroundImage: `url(${url}w780${this.state.movie
                  .backdrop_path})`,
                width: '100%',
                height: '92vh',
                backgroundSize: 'cover',
              }}
            >
              <div className="overlay" style={styles.overlay}>
                <div className="row">
                  <div className="col-md-6 p-5" style={styles.leftContainer}>
                    <h2>
                      {this.state.movie.title}
                    </h2>
                    <p style={styles.release}>
                      ({this.state.movie.release_date.split('-')[0]})
                      <span style={styles.genres}>{genres}</span>
                      <span style={{ paddingLeft: 30 }}>
                        Rating: {this.state.movie.vote_average} / 10
                      </span>
                    </p>
                    <p>
                      {this.state.movie.overview}
                    </p>
                    {this.state.inCollection
                      ? <div style={styles.buttonContainer}>
                          <span
                            style={{ color: '#2ecc71' }}
                            onClick={this.addMovie}
                          >
                            <i className="fa fa-check" /> In Collection
                          </span>
                          <span
                            style={{ color: '#e74c3c', cursor: 'pointer' }}
                            onClick={this.removeMovie}
                          >
                            <i className="fa fa-ban" /> Remove From Collection
                          </span>
                        </div>
                      : <div>
                          <span
                            style={styles.addMovieButton}
                            onClick={this.addMovie}
                          >
                            <i className="fa fa-plus" /> Add To Collection
                          </span>
                        </div>}
                  </div>
                  <div className="col-md-6 p-5">
                    <div className="embed-responsive embed-responsive-16by9">
                      <iframe
                        title={this.state.video.id}
                        className="embed-responsive-item"
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${this.state.video
                          .results[0].key}`}
                        frameBorder="0"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          : ''}
      </div>
    );
  }
}

const styles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    height: '100%',
    color: 'white',
  },
  leftContainer: {
    padding: '4rem',
  },
  release: {
    fontStyle: 'italic',
    fontSize: '1rem',
  },
  genres: {
    paddingLeft: 30,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  addMovieButton: {
    color: 'white',
    display: 'initial',
    cursor: 'pointer',
  },
};

export default Movie;
