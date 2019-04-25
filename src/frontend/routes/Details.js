import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Loader from "../components/Loader";
class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieID: "",
      movieName: "",
      movieDescription: ""
    };
  }

  componentDidMount() {
    let server = `/rest/shows/${this.props.match.params.idMovie}`;
    fetch(server)
      .then(data => data.json())
      .then(movie => {
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
              src={require(`./../common/img/${
                this.props.match.params.idMovie
              }.jpg`)}
              alt={this.state.movieName}
            />
          </div>
        </div>
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

export default withRouter(Details);
