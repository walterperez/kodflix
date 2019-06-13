import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter, Redirect } from 'react-router-dom';
import './Details.scss';
import Loader from './../../components/Loader/Loader';
export class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieID: '',
      movieName: '',
      movieDescription: '',
      error: '',
      isLoading: true
    };
  }

  componentDidMount() {
    if (this.props.match) {
      let server = `/rest/shows/${this.props.match.params.idMovie}`;
      fetch(server)
        .then(response => response.json())
        .then(movie => {
          this.setState({
            movieName: movie.title,
            movieID: movie.id,
            movieDescription: movie.synopsis
          });
        })
        .catch(err => {
          this.setState(
            {
              error: err,
              isLoading: !this.state.isLoading
            },
            () => console.log(this.state)
          );
          // this.props.history.push("/NotFound");
        });
    }
  }

  render() {
    if (this.state.movieName && this.props.match.params.idMovie) {
      return (
        <div className="Details" data-test="Details">
          <div className="details-container">
            <h1 className="movie-title">{this.state.movieName}</h1>
            <p className="description">{this.state.movieDescription}</p>
            <Link to={`/${this.props.match.params.idMovie}/play`}>
              <div className="PlayButton" />
            </Link>
          </div>
          <img
            className="movie-cover"
            src={`/movies/wallpapers/${this.props.match.params.idMovie}.jpg`}
            alt={this.state.movieName}
          />
        </div>
      );
    } else if (this.state.error) {
      return <Redirect to="/NotFound" />;
    } else if (this.state.isLoading) {
      return (
        <div>
          <Loader />
        </div>
      );
    } else {
      return <h1>Not Found from the gallery component! =(</h1>;
    }
  }
}

Details.propTypes = {
  // history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

const DetailsWitRouter = withRouter(Details);

export default DetailsWitRouter;
