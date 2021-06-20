import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Upload from "./components/Upload";
import Preview from "./components/Preview";
import Download from "./components/Download";
import initialState from "./initialState";
import initializeActions from "./actions";

const App = () => {
  const [state, setState] = useState(initialState);
  const actions = useMemo(() => initializeActions({state, setState}), [state, setState]);

  return (
    <Router>
      <Switch>
        <Route
          path="/:id/"
          children={({ location, match }) => {
            if (state.download.selectedFile) return <Preview state={state.download} />;
            return (
              <Download
                id={match.params.id}
                password={location.hash.substring(1)}
                actions={actions}
              />
            );
          }}
        />
        <Route path="/">
          <Upload
            state={state.upload}
            actions={actions}
          />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
