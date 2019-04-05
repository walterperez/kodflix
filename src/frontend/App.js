import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Gallery from "./components/Gallery";
import Details from "./routes/Details";
import NotFound from "./routes/NotFound";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <Switch>
          <div className="container">
            <Route exact path="/" component = { Gallery } />
            <Route
              exact
              path="/:idMovie"
              component={ Details }
            />
             <Route exact path="/NotFound" component = { NotFound } />
          </div>  
        </Switch>
      </Router>
    );
  }
}

export default App;
