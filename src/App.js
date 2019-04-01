import React, { Component } from "react";
import "./App.css";

//Covers
import LordOfTheRigns1Cover from "./img/LordOfTheRigns1Cover.jpg"
import BatmanCover from "./img/BatmanCover.jpg"
import SlendermanCover from "./img/SlendermanCover.jpg"
import SpidermanCover from "./img/SpidermanCover.jpg"
import StarTreckDiscoveryCover from "./img/StarTreckDiscoveryCover.jpg"
import StarWarsCover from "./img/StarWarsCover.jpg"


class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="flex-cointainer">
          <div className="flex-element">
          <img src={LordOfTheRigns1Cover} alt="Lord Of The Rigns 1 Cover"/>
          </div>
          <div className="flex-element">
          <img src={BatmanCover} alt="Batman Cover"/>
          </div>
          <div className="flex-element">
          <img src={SlendermanCover} alt="Slenderman Cover"/>
          </div>
        </div>
        <div className="flex-cointainer">
          <div className="flex-element">
          <img src={SpidermanCover} alt="Spiderman Cover"/>
          </div>
          <div className="flex-element">
          <img src={StarTreckDiscoveryCover} alt="Star Treck Discovery Cover"/>
          </div>
          <div className="flex-element">
          <img src={StarWarsCover} alt="Star Wars Cover"/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
