import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Movie(props) {
  return (
    <Link to={props.id} className="flex-element">
      <img src={`/movies/covers/${props.id}.jpg`} alt={`${props.name} Cover`} />
      <div className="box">
        <h1>{props.name}</h1>
      </div>
    </Link>
  );
}

Movie.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default Movie;
