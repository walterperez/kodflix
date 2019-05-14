import React, { Component } from "react";
import "./Play.scss";

export default class Play extends Component {
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
      });
  }

  render() {
    return (
      <>
        {this.state.movieUrl ? (
          <div className="Play">
            <iframe
              className="Video"
              src={`${this.state.movieUrl}`}
              height="100%"
              width="100%"
              frameborder="0"
              allowfullscreen
            />
          </div>
        ) : null}
      </>
    );
  }
}
