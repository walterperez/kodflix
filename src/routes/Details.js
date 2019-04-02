import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import moviesList from "./../components/MoviesDB";
class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      movieID: ""
    };
  }

  componentDidMount() {

    let idMovie = this.props.match.params.idMovie;
    console.log(idMovie)
    let movie = moviesList.find(( movie )=>{
        return movie.movieID === idMovie;
    })

    if (movie) {
      this.setState({
        message:movie.movieName,
        movieID:movie.movieID
      })
    } else {
      this.props.history.push('/NotFound')
    }
  }

  render() {
    return (
      <div>
        <h1>
          {this.state.message}
          {/* {this.props.match.params.idMovie.split("-").join(" ")} */}
        </h1>
        <Link to="/">Home</Link>
      </div>
    );
  }
}

export default withRouter(Details);