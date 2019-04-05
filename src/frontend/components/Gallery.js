import React, { Component } from "react";
//Components
import Movie from "./Movie";

export default class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
    this.handleMoviesListMapping = this.handleMoviesListMapping.bind(this);
  }

  componentWillMount() {
    let server = "/rest/shows";
    fetch(server)
      .then(data => data.json())
      .then(json => {
        this.setState(
          {
            movies: json
          },
          () => {
            console.log(this.state);
          }
        );
      });
  }

  handleMoviesListMapping() {
    const movies = this.state.movies
    console.log("this is movies state" , movies);
    return movies.map((movie) => {
      return (
        <Movie
          key={movie.id}
          name={movie.title}
          id={movie.id}
        />
      );
    });
  }

  render() {
    return (
        <div className="flex-container">
          {this.handleMoviesListMapping()}
        </div>
    );
  }
}
