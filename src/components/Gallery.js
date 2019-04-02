import React, { Component } from "react";
//Components
import Movie from "./Movie";
import moviesList from "./MoviesDB";

export default class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleMoviesListMapping = this.handleMoviesListMapping.bind(this);
  }

  handleMoviesListMapping() {
    return moviesList.map(movie => {
      return (
        <Movie
          name={movie.movieName}
          cover={movie.movieCover}
          id={movie.movieID}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <div className="flex-container">{this.handleMoviesListMapping()}</div>
      </div>
    );
  }
}
