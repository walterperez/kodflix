import React, { Component } from "react";
import "./App.css";
import Gallery from "./components/Gallery";

class App extends Component {
  render() {
    return (
      <div className="container">
        <Gallery />
      </div>
    );
  }
}

export default App;
