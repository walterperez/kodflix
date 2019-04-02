import React from "react";
//Components
import Movie from "./Movie";
//Covers
import LordOfTheRigns1Cover from "./../img/LordOfTheRigns1Cover.jpg";
import BatmanCover from "./../img/BatmanCover.jpg";
import SlendermanCover from "./../img/SlendermanCover.jpg";
import SpidermanCover from "./../img/SpidermanCover.jpg";
import StarTreckDiscoveryCover from "./../img/StarTreckDiscoveryCover.jpg";
import StarWarsCover from "./../img/StarWarsCover.jpg";

export default function Gallery(props) {
  return (
    <div>
      <div className="flex-container">
        <Movie name={"Lord Of The Rigns"} cover={LordOfTheRigns1Cover} />
        <Movie name={"Batman"} cover={BatmanCover} />
        <Movie name={"Slenderman"} cover={SlendermanCover} />
        <Movie name={"Spiderman"} cover={SpidermanCover} />
        <Movie name={"Star Treck Discovery"} cover={StarTreckDiscoveryCover} />
        <Movie name={"StarWars"} cover={StarWarsCover} />
      </div>
    </div>
  );
}
