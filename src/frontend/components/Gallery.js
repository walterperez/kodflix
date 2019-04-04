import React, { Component } from "react";
//Components
import Movie from "./Movie";
import moviesList from "./MoviesDB";

export default class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleMoviesListMapping = this.handleMoviesListMapping.bind(this);
    this.thing = [];
  }

  componentWillMount(){
    let server = "/rest/shows";
    fetch(server)
    .then(data => data.json())
    .then(json => {
      console.log(json)
    })
    }

  handleMoviesListMapping() {
    return moviesList.map((movie, index) => {
      return (
        <Movie key={index}
          name={movie.movieName}
          cover={movie.movieCover}
          id={movie.movieID}
        />
      );
    });
  }

  componentDidMount() {
    const server = "/rest/shows";
    fetch(server)
      .then(data => {
        return data.json();
      })
      .then(json => {
        console.log(json);
      })
  }

  render() {
    return (
      <div>
        <div className="flex-container">{this.handleMoviesListMapping()}</div>
      </div>
    );
  }
}