import React, { Component } from "react";
//Components
import Movie from "./Movie";
import Loader from "./Loader";

export default class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
    this.handleMoviesListMapping = this.handleMoviesListMapping.bind(this);
  }

  componentDidMount () {
    let server = "/rest/shows";
    fetch(server)
      .then(data => data.json())
      .then(json => {
        this.setState(
          {
            movies: json
          }
        );
      });
  }

  handleMoviesListMapping() {
    const movies = this.state.movies
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
      if(this.state.movies != []) {
        return ( 
          <div className="flex-container">
            {this.handleMoviesListMapping()}
          </div>
        )} 
      else 
        { return <div><Loader/></div> }
  }
}
