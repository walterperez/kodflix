import React from "react";
import { Route, Switch } from "react-router-dom";
import "./ManageTvShows.scss";
//Components
import AdminTVShowsHome from "./AdminTVShowsHome/AdminTVShowsHome";
import AdminTVShowsList from "./List/AdminTVShowsList";
import AdminTVShowsAdd from "./Add/AdminTVShowsAdd";
import AdminTVShowsEdit from "./Edit/AdminTVShowsEdit";

export default function ManageTvShows({ match }) {
  return (
    <div className="ManageTvShows">
      <Switch>
        <Route exact path={`${match.path}/`} component={AdminTVShowsHome} />
        <Route exact path={`${match.path}/list`} component={AdminTVShowsList} />
        <Route exact path={`${match.path}/add`} component={AdminTVShowsAdd} />
        <Route
          exact
          path={`${match.path}/edit/:idMovie`}
          component={AdminTVShowsEdit}
        />
      </Switch>
    </div>
  );
}
