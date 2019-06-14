import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './HamburgerButton.scss';
//Components
import MenuListElement from './MenuListElement/MenuListElement';
//Icons
import hamburgerButtonIcon from './../../common/icons/hamburgerIcon.svg';
import tvIconSVG from './../../common/icons/cinema.svg';
import homeIconSVG from './../../common/icons/icon.svg';
import LogInSVG from './../../common/icons/log-in.svg';
import LogOutSVG from './../../common/icons/logOut.svg';

class HamburgerButton extends Component {
  constructor() {
    super();
    this.state = {
      isMenuActive: false
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
    const { isLogged, changeLogged, isAdmin } = this.props;
    return (
      <>
        {/* Hamburger Button */}
        <div
          className="HamburgerButton"
          onClick={() => this.handleClick()}
          data-test="HamburgerButton"
        >
          <img
            className="HamburgerButton-icon"
            src={hamburgerButtonIcon}
            alt="hamburger button"
          />
        </div>
        {/* List Menu */}
        <div
          onClick={() => this.handleCloseMenuAfterClick()}
          className={this.state.isMenuActive ? 'translucid_backgroud' : null}
          data-test="TranslucidBackground"
        >
          <div
            className={`Menu-List ${
              this.state.isMenuActive ? 'visible' : null
            }`}
            data-test="MenuList"
          >
            <MenuListElement
              text="Home"
              icon={homeIconSVG}
              route="/"
              handleCloseMenuAfterClick={this.handleCloseMenuAfterClick}
            />
            {isLogged && isAdmin && (
              <MenuListElement
                text="Manage TV Shows"
                icon={tvIconSVG}
                route="/manage/tv-shows"
                handleCloseMenuAfterClick={this.handleCloseMenuAfterClick}
              />
            )}
            {!isLogged && (
              <MenuListElement
                text="Sign In"
                icon={LogInSVG}
                route="/sign/in"
                handleCloseMenuAfterClick={this.handleCloseMenuAfterClick}
              />
            )}
            {isLogged && (
              <MenuListElement
                text="Log out"
                icon={LogOutSVG}
                route="/sign/in"
                handleCloseMenuAfterClick={this.handleCloseMenuAfterClick}
                actionCB={changeLogged}
              />
            )}
          </div>
        </div>
      </>
    );
  }
}

HamburgerButton.propTypes = {
  isLogged: PropTypes.bool,
  changeLogged: PropTypes.func,
  isAdmin: PropTypes.bool
};

export default HamburgerButton;
