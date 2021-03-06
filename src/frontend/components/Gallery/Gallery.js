import React, { Component } from 'react';
//Components
import Movie from '../Movie/Movie';
import Loader from '../Loader/Loader';

export default class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: ''
    };
    this.handleMoviesListMapping = this.handleMoviesListMapping.bind(this);
  }

  componentDidMount() {
    fetch('/rest/shows')
      .then(response => response.json())
      .then(shows => {
        this.setState({
          movies: shows
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleMoviesListMapping() {
    const movies = this.state.movies;
    return movies.map(movie => {
      return <Movie key={movie.id} name={movie.title} id={movie.id} />;
    });
  }

  render() {
    if (this.state.movies.length >= 1) {
      return (
        <div className="flex-container">{this.handleMoviesListMapping()}</div>
      );
    } else {
      return (
        <div>
          <Loader />
        </div>
      );
    }
  }
}
