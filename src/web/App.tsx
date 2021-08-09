import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Upload, Download } from "./components";

const App = ({state, events}) => {
  return (
    <Router>
      <Switch>
        <Route
          path="/:id/"
          children={({ location, match }) => (
            <Download
                id={match.params.id}
                password={location.hash.substring(1)}
                state={state.download}
                onRender={events.DownloadAFileRequested}
            />)
          }
        />
        <Route path="/">
          <Upload
            state={state.upload}
            onAddFile={events.FileAdded}
            onFileUpload={events.FileUploadRequested}
          />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
