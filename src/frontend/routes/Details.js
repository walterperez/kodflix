import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieID: "",
      movieName: "",
      movieDescription: ""
    };
  }

  componentWillMount() {
    let server = "/rest/shows";
    fetch(server)
      .then(data => data.json())
      .then(movies => {
        let idMovie = this.props.match.params.idMovie;
        let movie = movies.find(movie => {
          return movie.id === idMovie;
        });
        if (movie) {
          this.setState({
            movieName: movie.title,
            movieID: movie.id,
            movieDescription: movie.synopsis
          });
        } else {
          this.props.history.push("/NotFound");
        }
      });
  }

  render() {    
    if (this.state.movieName) {
      return (
        <div id="Details">
          <h1 className="movie-title">{this.state.movieName}</h1>
          <div className="details-container">
            <p className="description">
              {this.state.movieDescription}
              <br />
              <br />
              <span className="return-btn">
                <Link to="/">Home</Link>
              </span>
            </p>
            <img
              className="movie-cover"
              src={require(`./../common/img/${this.props.match.params.idMovie}.jpg`)}
              alt={this.state.movieName}
            />
          </div>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

export default withRouter(Details);
