import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Movie(props) {
  return props.id && props.name ? (
    <Link to={props.id} className="flex-element" data-test="Movie">
      <img src={`/movies/covers/${props.id}.jpg`} alt={`${props.name} Cover`} />
      <div className="box">
        <h1>{props.name}</h1>
      </div>
    </Link>
  ) : null;
}

Movie.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string
};

export default Movie;
