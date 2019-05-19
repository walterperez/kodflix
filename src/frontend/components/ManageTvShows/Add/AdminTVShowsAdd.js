import React, { Component } from "react";
import "./AdminTVShowsAdd.scss";

export default class AdminTVShowsAdd extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: ""
    };
  }

  handleTextChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleFormSubmit() {
    const { title, description } = this.state;
    const myBody = { title, description };
    fetch("/rest/shows/add", {
      method: "POST",
      body: JSON.stringify(myBody),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => console.log(data));
  }

  render() {
    let { title, description } = this.state;
    return (
      <div className="AdminTVShowsAdd">
        <h3 className="AdminTVShowsAdd__Title">Add a TV show</h3>
        <div className="AdminTVShowsAdd__Form__Container">
          <h5>Add a new movie title:</h5>
          <input
            type="text"
            placeholder="Title"
            className="AdminTVShowsAdd__Form_Item"
            value={title}
            name="title"
            onChange={e => this.handleTextChange(e)}
          />
          <h5>Add a new movie description:</h5>
          <textarea
            placeholder="Description"
            type="text"
            className="AdminTVShowsAdd__Form_Item--Description"
            value={description}
            name="description"
            rows="8"
            cols="40"
            onChange={e => this.handleTextChange(e)}
          />
          <br />
          <button
            className="AdminTVShowsAdd__Form__Button--Submit"
            type="button"
            onClick={() => this.handleFormSubmit()}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}
