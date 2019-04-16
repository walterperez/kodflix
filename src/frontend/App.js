import React, { Component } from "react";
import {Route, Switch, withRouter } from "react-router-dom";
import "./App.css";
import Gallery from "./components/Gallery";
import Details from "./routes/Details";
import NotFound from "./routes/NotFound";
//Google Analitycs
import ReactGA from "react-ga";
ReactGA.initialize("UA-138410439-1");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log('the props are', this.props);
    // const history = createBrowserHistory();
    // Get the current location.
    ReactGA.pageview(window.location.pathname + window.location.search);
    // Listen for changes to the current location.
    this.props.history.listen((loc, act) => {
      // location is an object like window.location
      ReactGA.pageview(window.location.pathname + window.location.search);
      console.log(act, loc.pathname, loc.state);
    });
    // Use push, replace, and go to navigate around.
    // history.push(this.props.location, {myRandomState : "hello"});
    // To stop listening, call the function returned from listen().
    // unlisten(location);
  }

  render() {
    return (
      // <Router>
      <div className="container">
        <Switch>
          <Route exact path="/" component={Gallery} />
          <Route exact path="/:idMovie" component={Details} />
          <Route exact path="/NotFound" component={NotFound} />
        </Switch>
      </div>
      // </Router>
    );
  }
}

export default withRouter(App);
