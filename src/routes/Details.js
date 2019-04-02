import React from "react";
import {Link} from "react-router-dom";

export default function Details({ match }) {
  return (
    <div>
      <h1>Hello, this will be the details page for {match.params.movieName.split("-").join(" ")}</h1>
      <Link to="/">Home</Link>
    </div>
  );
}
