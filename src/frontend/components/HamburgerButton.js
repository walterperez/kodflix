import React, { Component } from "react";
import hamburgerButtonIcon from "./../common/img/hamburgerIcon.svg";

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
        <div className="HamburgerButton" onClick={() => this.handleClick()}>
          <img
            className="HamburgerButton-icon"
            src={hamburgerButtonIcon}
            alt="hamburger button"
          />
        </div>
        <div
          className={this.state.isMenuActive ? "translucid_backgroud" : null}
        >
          <div
            className={`Menu-List ${
              this.state.isMenuActive ? this.state.isVisible : null
            }`}
          >
            <p>Hello Menu!</p>
          </div>
        </div>
      </>
    );
  }
}
