import React, { Component } from "react";
import "./AdminTVShowsList.scss";
import Loader from "./../../Loader/Loader";
export default class AdminTVShowsList extends Component {
  constructor(props) {
    super();
    this.state = {
      shows: []
    };
  }

  componentDidMount() {
    fetch("/rest/shows")
      .then(response => response.json())
      .then(shows => {
        this.setState({ shows });
      });
  }

  render() {
    let { shows } = this.state;
    if (shows) {
      return (
        <div className="AdminTVShowsList">
          <h3 className="AdminTVShowsList__title">List of avanibles movies:</h3>
          <ul className="AdminTVShowsList__List__TVShows">
            {shows.map((show, index) => {
              return (
                <li className="AdminTVShowsList__List__item--show" key={index}>
                  {show.title}
                </li>
              );
            })}
          </ul>
        </div>
      );
    } else {
      return <Loader />;
    }
  }
}
