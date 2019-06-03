import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./AdminTVShowsList.scss";
import Loader from "./../../Loader/Loader";
class AdminTVShowsList extends Component {
  constructor(props) {
    super();
    this.state = {
      shows: [],
      message: ""
    };
  }

  handleDeleteMovie(e) {
    const { name } = e.target;
    fetch(`/rest/shows/delete/${name}`, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(json => {
        this.setState({
          id: "",
          title: "",
          description: "",
          trailer: "",
          file: "",
          wallpaper: "",
          message: json.message
        });
        setTimeout(() => {
          this.props.history.push("/");
        }, 2000);
      });
  }

  componentDidMount() {
    fetch("/rest/shows")
      .then(response => response.json())
      .then(shows => {
        this.setState({ shows });
      });
  }

  render() {
    let { shows, message } = this.state;
    if (shows) {
      return (
        <div className="AdminTVShowsList">
          {message && (
            <div className="confirmation__message">
              <div className="confirmation__message__box">
                <h3>{message}</h3>
              </div>
            </div>
          )}
          <h3 className="AdminTVShowsList__title">List of avanibles movies:</h3>
          <ul className="AdminTVShowsList__List__TVShows">
            {shows.map((show, index) => {
              return (
                <li className="AdminTVShowsList__List__item--show" key={index}>
                  {show.title}{" "}
                  <Link
                    to={`/manage/tv-shows/edit/${show.id}`}
                    className="AdminTVShowsList__List__item--Link"
                  >
                    Edit
                  </Link>
                  <button
                    name={show.id}
                    onClick={e => this.handleDeleteMovie(e)}
                    className="AdminTVShowsList__List__item--Delete--Button"
                  >
                    Delete
                  </button>
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

export default withRouter(AdminTVShowsList);
