import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./HamburgerButton.scss";
//Components
import MenuListElement from "./MenuListElement/MenuListElement";
//Icons
import hamburgerButtonIcon from "./../../common/icons/hamburgerIcon.svg";
import tvIconSVG from "./../../common/icons/cinema.svg";
import homeIconSVG from "./../../common/icons/icon.svg";

export default class HamburgerButton extends Component {
  constructor() {
    super();
    this.state = {
      isMenuActive: false,
      isVisible: "visible"
    };
    this.handleCloseMenuAfterClick = this.handleCloseMenuAfterClick.bind(this);
  }

  handleClick() {
    this.setState({
      isMenuActive: !this.state.isMenuActive
    });
  }

  handleCloseMenuAfterClick() {
    this.setState({
      isMenuActive: !this.state.isMenuActive
    });
  }

  render() {
    return (
      <>
        {/* Hamburger Button */}
        <div className="HamburgerButton" onClick={() => this.handleClick()}>
          <img
            className="HamburgerButton-icon"
            src={hamburgerButtonIcon}
            alt="hamburger button"
          />
        </div>
        {/* List Menu */}
        <div
          className={this.state.isMenuActive ? "translucid_backgroud" : null}
        >
          <div
            className={`Menu-List ${
              this.state.isMenuActive ? this.state.isVisible : null
            }`}
          >
            <MenuListElement
              text="Home"
              icon={homeIconSVG}
              route="/"
              handleCloseMenuAfterClick={this.handleCloseMenuAfterClick}
            />
            <MenuListElement
              text="Manage TV Shows"
              icon={tvIconSVG}
              route="/manage/tv-shows"
              handleCloseMenuAfterClick={this.handleCloseMenuAfterClick}
            />
          </div>
        </div>
      </>
    );
  }
}