import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMovieUrl from './utils/getMovieUrl';
import './Play.scss';

class Play extends Component {
  constructor() {
    super();
    this.state = {};
  }

  downloadMovieUrl() {
    const conditionProps =
      this.props.match !== undefined &&
      this.props.match.params !== undefined &&
      typeof this.props.match.params.idMovie === 'string';
    if (conditionProps) {
      getMovieUrl(this.props.match.params.idMovie)
        .then(data => {
          this.setState({
            movieUrl: data.data.movieUrl
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  componentDidMount() {
    this.downloadMovieUrl();
  }

  render() {
    return (
      <>
        {this.state.movieUrl ? (
          <div className="Play" data-test="Play">
            <iframe
              title={`${this.state.movieUrl}`}
              className="Video"
              src={`${this.state.movieUrl}`}
              height="100%"
              width="100%"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        ) : null}
      </>
    );
  }
}

Play.propTypes = {
  match: PropTypes.object
};

export default Play;
