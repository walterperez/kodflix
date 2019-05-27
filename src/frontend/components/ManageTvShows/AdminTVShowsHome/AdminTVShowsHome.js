import React from "react";
import { Link } from "react-router-dom";
import "./AdminTVShowsHome.scss";

export default function AdminTVShowsHome({ match }) {
  return (
    <div className="AdminTVShowsHome">
      <h2 className="AdminTVShowsHome__Title">Manage Tv Shows</h2>
      <div className="AdminTVShowsHome__Menu">
        <ul className="AdminTVShowsHome__Menu__List">
          <Link to={`${match.path}list`}>
            <li className="AdminTVShowsHome__Menu__Item">List of TV shows</li>
          </Link>
          <Link to={`${match.path}add`}>
            <li className="AdminTVShowsHome__Menu__Item">Add a new TV show</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
