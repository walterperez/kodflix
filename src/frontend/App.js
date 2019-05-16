import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import "./App.scss";
//Components
import Gallery from "./components/Gallery/Gallery";
import Play from "./components/Play/Play";
import HamburgerButton from "./components/HamburgerButton/HamburgerButton";
import ManageTvShows from "./components/ManageTvShows/ManageTvShows";
//Routes
import Details from "./routes/Details/Details";
import NotFound from "./routes/NotFound/NotFound";
//Google Analitycs
import ReactGA from "react-ga";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    ReactGA.initialize("UA-138410439-1");
    ReactGA.pageview(window.location.pathname + window.location.search);
    this.props.history.listen((loc, act) => {
      ReactGA.pageview(window.location.pathname + window.location.search);
      console.log(act, loc.pathname, loc.state);
    });
  }

  render() {
    return (
      <div className="App">
        <HamburgerButton />
        <Switch>
          <Route exact path="/" component={Gallery} />
          <Route path="/manage/tv-shows" component={ManageTvShows} />
          <Route exact path="/:idMovie/play" component={Play} />
          <Route exact path="/:idMovie" component={Details} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
