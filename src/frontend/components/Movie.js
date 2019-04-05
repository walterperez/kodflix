import React from "react";
import { Link } from "react-router-dom";

export default function Movie(props) {
  return (
    <div className="flex-element">
      <Link to={props.id}>
        <img src={require(`./../common/img/${props.id}.jpg`)} alt={`${props.name} Cover`} />
      </Link>
      <div className="box">
        <h1>{props.name}</h1>
      </div>
    </div>
  );
}
