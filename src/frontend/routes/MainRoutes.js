import React from 'react';
import { Switch, Route } from 'react-router-dom';
//Components
import SignIn from './../components/SignIn/SignIn';
import SignUp from './../components/SignUp/SignUp';
import Play from './../components/Play/Play';
import Details from './Details/Details';
import Gallery from './../components/Gallery/Gallery';
import ManageTvShows from './../components/ManageTvShows/ManageTvShows';
import NotFound from './NotFound/NotFound';

export default function MainRoutes({
  isLogged,
  isAdmin,
  changeLogged,
  changeAdmin
}) {
  return (
    <Switch>
      <Route exact path="/" component={Gallery} />
      {isLogged && isAdmin ? (
        <Route path="/manage/tv-shows" component={ManageTvShows} />
      ) : null}
      <Route
        path="/sign/in"
        component={() => (
          <SignIn
            changeLogged={changeLogged}
            changeAdmin={changeAdmin}
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
  );
}
