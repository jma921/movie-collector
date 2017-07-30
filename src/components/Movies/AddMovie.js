import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import ImageLink from '../ImageLink/ImageLink';

class AddMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      movies: [],
    };
  }
  async fetchMovieData() {
    const apiKey = '9cfb734370df380453435206255cb5cf';
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${this
      .state.searchQuery}&page=1&include_adult=false`;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      movies: data.results,
    });
  }
  submitForm = e => {
    e.preventDefault();
    this.fetchMovieData();
    this.setState({
      searchQuery: '',
    });
  };
  handleChange = event => {
    this.setState({ searchQuery: event.target.value });
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <Form onSubmit={this.submitForm}>
              <FormGroup>
                <Label>Movie Search</Label>
                <Input
                  type="text"
                  name="search"
                  value={this.state.searchQuery}
                  placeholder="Goodfellas"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <Button>Submit</Button>
            </Form>
          </div>
        </div>
        <div className="row pt-4">
          {this.state.movies
            ? this.state.movies.map((movie, index) =>
                <div key={index} className="col-md-3">
                  <ImageLink
                    path={movie.poster_path}
                    alt={`${movie.title} Thumbnail`}
                    title={movie.title}
                    rating={movie.vote_average}
                    releaseDate={movie.release_date}
                    to={`/movie/${movie.id}`}
                  />
                </div>
              )
            : ''}
        </div>
      </div>
    );
  }
}

export default AddMovie;
