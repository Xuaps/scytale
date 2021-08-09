import React from "react";
import ReactDOM from "react-dom";

import "./style.css";
import UserStories from "./user_stories";
import App from "./App";

ReactDOM.render(
  <UserStories
    app={props =>
      <App {...props} /> } />,
  document.getElementById("root"),
);
