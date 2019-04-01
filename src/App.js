import React, { Component } from "react";
import "./App.css";

//Covers
import LordOfTheRigns1Cover from "./img/LordOfTheRigns1Cover.jpg";
import BatmanCover from "./img/BatmanCover.jpg";
import SlendermanCover from "./img/SlendermanCover.jpg";
import SpidermanCover from "./img/SpidermanCover.jpg";
import StarTreckDiscoveryCover from "./img/StarTreckDiscoveryCover.jpg";
import StarWarsCover from "./img/StarWarsCover.jpg";

//Components
import Movie from "./components/Movie";

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="flex-container">
          <Movie name={"Lord Of The Rigns"} cover={LordOfTheRigns1Cover} />
          <Movie name={"Batman"} cover={BatmanCover} />
          <Movie name={"Slenderman"} cover={SlendermanCover} />
        </div>
        <div className="flex-container">
          <Movie name={"Spiderman"} cover={SpidermanCover} />
          <Movie name={"Star Treck Discovery"} cover={StarTreckDiscoveryCover} />
          <Movie name={"StarWars"} cover={StarWarsCover} />
        </div>
      </div>
    );
  }
}

export default App;
