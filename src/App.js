import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Gallery from "./components/Gallery";
import Details from "./routes/Details";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Route exact path="/" component={Gallery} />
          <Route exact path="/:movieName" component={Details} />
        </div>
      </Router>
    );
  }
}

export default App;
