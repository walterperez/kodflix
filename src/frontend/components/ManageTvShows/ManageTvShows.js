import React from "react";
import { Route, Switch } from "react-router-dom";
import "./ManageTvShows.scss";
//Components
import AdminTVShowsList from "./List/AdminTVShowsList";
import AdminTVShowsAdd from "./Add/AdminTVShowsAdd";
import AdminTVShowsEdit from "./Edit/AdminTVShowsEdit";

const AdminTVShowsHome = () => (
  <p style={{ color: "red" }}>You are in ManageTvShows</p>
);

export default function ManageTvShows({ match }) {
  return (
    <div className="ManageTvShows">
      <Switch>
        <Route exact path={`${match.path}/`} component={AdminTVShowsHome} />
        <Route exact path={`${match.path}/list`} component={AdminTVShowsList} />
        <Route exact path={`${match.path}/add`} component={AdminTVShowsAdd} />
        <Route exact path={`${match.path}/edit`} component={AdminTVShowsEdit} />
      </Switch>
    </div>
  );
}
