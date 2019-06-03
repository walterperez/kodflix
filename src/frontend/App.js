import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import "./App.scss";
//Components
import Gallery from "./components/Gallery/Gallery";
import Play from "./components/Play/Play";
import HamburgerButton from "./components/HamburgerButton/HamburgerButton";
import ManageTvShows from "./components/ManageTvShows/ManageTvShows";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";

//Routes
import Details from "./routes/Details/Details";
import NotFound from "./routes/NotFound/NotFound";

//Google Analitycs
import ReactGA from "react-ga";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false
    };
  }

  changeLoged() {
    localStorage.clear();
    this.setState({
      isLogged: !this.state.isLogged
    });
  }

  componentDidMount() {
    let session = localStorage.getItem("mySessionX") || "";
    if (session) this.changeLoged();
    ReactGA.initialize("UA-138410439-1");
    ReactGA.pageview(window.location.pathname + window.location.search);
    this.props.history.listen((loc, act) => {
      ReactGA.pageview(window.location.pathname + window.location.search);
    });
  }

  render() {
    const { isLogged } = this.state;
    return (
      <div className="App">
        <HamburgerButton
          isLogged={this.state.isLogged}
          changeLoged={this.changeLoged}
        />
        <Switch>
          <Route exact path="/" component={Gallery} />
          {isLogged ? (
            <Route path="/manage/tv-shows" component={ManageTvShows} />
          ) : null}
          <Route
            path="/sign/in"
            component={() => (
              <SignIn
                changeLoged={() => this.changeLoged()}
                isLogged={isLogged}
              />
            )}
          />
          <Route path="/sign/up" component={SignUp} />
          <Route exact path="/:idMovie/play" component={Play} />
          <Route exact path="/:idMovie" component={Details} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
