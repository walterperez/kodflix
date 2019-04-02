import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import moviesList from "./../components/MoviesDB";
class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieID: "",
      movieName:"",
      movieDescription:"",
      movieCover:""
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
        movieName : movie.movieName,
        movieID : movie.movieID,
        movieDescription : movie.movieDescription,
        movieCover : movie.movieCover
      })
    } else {
      this.props.history.push('/NotFound')
    }
  }

  render() {
    return (
      <div id="Details">
        <h1 className="movie-title">{this.state.movieName}</h1>
        <div className="details-container">
          <p className="desription">{this.state.movieDescription}
          <br /><br />
          <span className="Link"><Link to="/">Home</Link></span>
          </p>
          <img className="movie-cover" src={this.state.movieCover} alt={this.state.movieName}/>
        </div>
      </div>
    );
  }
}

export default withRouter(Details);