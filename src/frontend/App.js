import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './App.scss';
//Components
import Gallery from './components/Gallery/Gallery';
import Play from './components/Play/Play';
import HamburgerButton from './components/HamburgerButton/HamburgerButton';
import ManageTvShows from './components/ManageTvShows/ManageTvShows';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';

//Redux Types
import {
  AUTH_LOGOUT,
  AUTH_LOGIN,
  AUTH_ADMIN_LOGIN,
  AUTH_ADMIN_LOGOUT
} from './actions/types';

//Routes
import Details from './routes/Details/Details';
import NotFound from './routes/NotFound/NotFound';

//Google Analitycs
import ReactGA from 'react-ga';

class App extends Component {
  static propTypes = {
    isLogged: PropTypes.bool,
    isAdmin: PropTypes.bool
  };
  constructor(props) {
    super(props);
    this.state = {
      isLogged: props.isLogged,
      isAdmin: props.isAdmin
    };
  }

  changeLogged() {
    this.state.isLogged
      ? this.props.dispatch({ type: AUTH_LOGOUT })
      : this.props.dispatch({ type: AUTH_LOGIN });
    this.setState({
      isLogged: this.props.isLogged
    });
  }

  changeAdmin() {
    this.state.isAdmin
      ? this.props.dispatch({ type: AUTH_ADMIN_LOGOUT })
      : this.props.dispatch({ type: AUTH_ADMIN_LOGIN });
    this.setState({
      isLogged: this.props.isLogged
    });
  }

  static getDerivedStateFromProps(props, state) {
    if (props.isLogged !== state.isLogged || props.isAdmin !== state.isAdmin) {
      return {
        isLogged: props.isLogged,
        isAdmin: props.isAdmin
      };
    }
    return null;
  }

  componentDidMount() {
    //Check for user session in the browser
    let session = localStorage.getItem('mySessionX') || '';
    let sessionAdmin = localStorage.getItem('mySessionA') || '';
    if (session) {
      localStorage.clear();
      if (sessionAdmin) this.changeAdmin();
      this.changeLogged();
    }
    //Google Analytics
    ReactGA.initialize('UA-138410439-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
    this.props.history.listen((loc, act) => {
      ReactGA.pageview(window.location.pathname + window.location.search);
    });
  }

  render() {
    const { isLogged, isAdmin } = this.state;
    return (
      <div className="App">
        <HamburgerButton
          isLogged={isLogged}
          isAdmin={isAdmin}
          changeLogged={this.changeLogged}
          changeAdmin={this.changeAdmin}
        />
        <Switch>
          <Route exact path="/" component={Gallery} />
          {isLogged && isAdmin ? (
            <Route path="/manage/tv-shows" component={ManageTvShows} />
          ) : null}
          <Route
            path="/sign/in"
            component={() => (
              <SignIn
                changeLogged={() => this.changeLogged()}
                changeAdmin={() => this.changeAdmin()}
                isLogged={isLogged}
                isAdmin={isAdmin}
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

const mapStateToProps = state => ({
  isLogged: state.auth.isLogged,
  isAdmin: state.auth.isAdmin
});

export default withRouter(connect(mapStateToProps)(App));

// export default withRouter(App);
