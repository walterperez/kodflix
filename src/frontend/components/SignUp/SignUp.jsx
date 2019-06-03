import React, { Component } from "react";
import "./SignUp.scss";

export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      repeat_password: "",
      errors: []
    };
  }

  handleInputChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  checkInputsBeforeSubmit() {
    const { email, password, repeat_password } = this.state;
    let errors = [];
    if (!email) {
      errors.push("Email field can not be empty.");
    }
    if (email.length < 6) {
      errors.push("Email field can not have less than six characters.");
    }
    if (password !== repeat_password) {
      errors.push("Passwords does not match.");
    }
    return errors;
  }

  handleSignUpSubmit(e) {
    e.preventDefault();
    //Reset the previous errors
    this.setState({
      errors: []
    });
    //Check for new Errors
    const errors = this.checkInputsBeforeSubmit();

    if (errors.length > 0) {
      this.setState({
        errors
      });
      return null;
    } else {
      const { email, password } = this.state;
      fetch("/rest/user/sign/up", {
        method: "POST",
        body: JSON.stringify({ email, password }),
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
            errors: [error]
          });
        });
    }
  }

  render() {
    const { message, errors } = this.state;
    return (
      <div className="SignUp">
        <h1 className="SignUp__Title">Sign Up</h1>
        {errors.length > 0
          ? errors.map(error => {
              return <h2 className="SignUp__Title">{error}</h2>;
            })
          : null}
        {message ? <h2 className="SignUp__Title">{message}</h2> : null}
        <div className="SignUp__Inputs--Container">
          <input
            className="SignUp__Inputs--Container__Item"
            type="email"
            name="email"
            placeholder="Email"
            onChange={e => this.handleInputChange(e)}
            required
            value={this.state.email}
          />
          <input
            className="SignUp__Inputs--Container__Item"
            type="password"
            name="password"
            placeholder="Password"
            onChange={e => this.handleInputChange(e)}
            required
            value={this.state.password}
          />
          <input
            className="SignUp__Inputs--Container__Item"
            type="password"
            name="repeat_password"
            placeholder="Repeat password"
            onChange={e => this.handleInputChange(e)}
            required
            value={this.state.repeat_password}
          />
          <button
            className="SignUp__Inputs--Container__Button"
            onClick={e => this.handleSignUpSubmit(e)}
          >
            Sign Up
          </button>
        </div>
      </div>
    );
  }
}
