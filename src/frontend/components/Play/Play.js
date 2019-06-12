import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Play.scss';

class Play extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    fetch(`/rest/shows/${this.props.match.params.idMovie}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          movieUrl: data.movieUrl
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <>
        {this.state.movieUrl ? (
          <div className="Play">
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
  match: PropTypes.object.isRequired
};

export default Play;
