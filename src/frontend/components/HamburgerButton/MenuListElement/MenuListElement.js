import React from "react";
import { Link } from "react-router-dom";
import "./MenuListElement.scss";

export default function MenuListElement({
  text,
  icon,
  route,
  handleCloseMenuAfterClick
}) {
  return (
    <Link
      to={`${route}`}
      style={{ textDecoration: "none" }}
      onClick={() => handleCloseMenuAfterClick()}
    >
      <div className="Menu-item">
        <img src={icon} alt="tv icon" className="menu_list_icon" />
        <p className="menu_list_text">{text}</p>
      </div>
    </Link>
  );
}
