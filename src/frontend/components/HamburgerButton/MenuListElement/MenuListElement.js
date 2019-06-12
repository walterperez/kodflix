import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './MenuListElement.scss';

function MenuListElement({
  text,
  icon,
  route,
  handleCloseMenuAfterClick,
  actionCB
}) {
  return (
    <Link
      to={`${route}`}
      style={{ textDecoration: 'none' }}
      onClick={actionCB ? () => actionCB() : () => handleCloseMenuAfterClick()}
    >
      <div className="Menu-item">
        <img src={icon} alt="tv icon" className="menu_list_icon" />
        <p className="menu_list_text">{text}</p>
      </div>
    </Link>
  );
}

MenuListElement.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  handleCloseMenuAfterClick: PropTypes.func.isRequired,
  actionCB: PropTypes.func
};

export default MenuListElement;
