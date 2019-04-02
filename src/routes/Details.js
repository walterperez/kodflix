import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Details extends Component {
  constructor (props) {
    super(props)
    this.state = {
      message: "this will be the details page for each Movie & TV show :)"
    }
  }

  componentDidMount () {
    setTimeout(
      () => {
        this.setState({
        message:"Coming soon! :)"
        })
      }
      , 3000);
  }

  render() {
    return (
      <div>
        <h1>
          Hello, this will be the details page for{" "}
          {this.props.match.params.idMovie.split("-").join(" ")}
        </h1>
        <hr />
        <h1>
          The message state of this component is:
          <strong>
            {this.state.message}
          </strong>
        </h1>
        <Link to="/">Home</Link>
      </div>
    );
  }
}
