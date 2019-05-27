import React, { Component } from "react";
import "./SignIn.scss";

export default class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      message: "",
      error: ""
    };
  }

  handleInputChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSignInSubmit() {
    fetch("/rest/user/sign/in", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(json => {
        console.log("json", json);
        const message = json.message;
        const error = json.error;
        this.setState({
          message,
          error
        });
      });
  }

  render() {
    const { message, error } = this.state;
    return (
      <div className="SignIn">
        <h1 className="SignIn__Title">Sign In</h1>
        {error ? (
          <h2 className="SignIn__Title">Opps! Wrong email or password!</h2>
        ) : null}
        {message ? <h2 className="SignIn__Title">{message}</h2> : null}
        <div className="SignIn__Inputs--Container">
          <input
            className="SignIn__Inputs--Container__Item"
            type="email"
            name="email"
            placeholder="Email"
            onChange={e => this.handleInputChange(e)}
            required
            value={this.state.email}
          />
          <input
            className="SignIn__Inputs--Container__Item"
            type="password"
            name="password"
            placeholder="Password"
            onChange={e => this.handleInputChange(e)}
            required
            value={this.state.password}
          />
          <button
            className="SignIn__Inputs--Container__Button"
            onClick={e => this.handleSignInSubmit(e)}
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }
}
