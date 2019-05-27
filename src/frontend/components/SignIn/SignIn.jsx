import React, { Component } from "react";
import "./SignIn.scss";

export default class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
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
      body: this.state
    });
  }

  render() {
    return (
      <div className="SignIn">
        <h1 className="SignIn__Title">Sign In</h1>
        <div className="SignIn__Inputs--Container">
          <input
            className="SignIn__Inputs--Container__Item"
            type="text"
            name="email"
            placeholder="Email"
            onChange={e => this.handleInputChange(e)}
            required
            value={this.state.email}
          />
          <input
            className="SignIn__Inputs--Container__Item"
            type="text"
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
