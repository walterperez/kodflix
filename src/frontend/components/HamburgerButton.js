import React from "react";
import hamburgerButtonIcon from "./../common/img/hamburgerIcon.svg";

export default function HamburgerButton() {
  return (
    <div className="HamburgerButton">
      <img
        className="HamburgerButton-icon"
        src={hamburgerButtonIcon}
        alt="hamburger button"
      />
    </div>
  );
}
