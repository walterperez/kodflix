import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./HamburgerButton.scss";
//Icons
import hamburgerButtonIcon from "./../../common/icons/hamburgerIcon.svg";
import tvIconSVG from "./../../common/icons/cinema.svg";

export default class HamburgerButton extends Component {
  constructor() {
    super();
    this.state = {
      isMenuActive: false,
      isVisible: "visible"
    };
  }

  handleClick() {
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
            <Link to="/manage/tv-shows" style={{ textDecoration: "none" }}>
              <div className="Menu-item">
                <img src={tvIconSVG} alt="tv icon" className="menu_list_icon" />
                <p className="menu_list_text">Manage TV Shows</p>
              </div>
            </Link>
          </div>
        </div>
      </>
    );
  }
}
