import React from "react";
import { Link } from "react-router-dom";

export default function Movie(props) {
  return (
    <div className="flex-element">
      <Link to={props.name.split(" ").join("-")}>
        <img src={props.cover} alt={`${props.name} Cover`} />
      </Link>
      <div className="box">
        <h1>{props.name}</h1>
      </div>
    </div>
  );
}
