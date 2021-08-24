import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Upload, Download, Stats } from "./components";

const App = ({state, events}) => {
  return (
    <Router>
      <Switch>
        <Route path="/stats/:id/" 
          children={({ location, match }) => (
            <Stats 
              id={match.params.id}
              state={state.file_stats}
              onLoad={events.FileStatsRequested}
            />
          )}  
        />
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
            onDeleteFile={events.FileDeletionRequested}
          />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
