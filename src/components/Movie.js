import React from "react";

export default function Movie (props) {
    return (
        <div className="flex-element">
        <img src={props.cover} alt={`${props.name} Cover`} />
        <div className="box">
          <h1>{props.name}</h1>
        </div>
      </div>
    )
}