import React from "react";
import { Link } from "react-router-dom";

export default function Movie(props) {
  return (
    <Link to={props.id} className="flex-element">
      <img src={`/movies/covers/${props.id}.jpg`} alt={`${props.name} Cover`} />
      <div className="box">
        <h1>{props.name}</h1>
      </div>
    </Link>
  );
}
