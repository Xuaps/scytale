import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Upload from "./components/Upload";
import Download from "./components/Download";
import store from "./store";
import { DownloadFile, EncryptFile, UploadFile } from './commands';
import { DefaultApi } from "../../gen";
import * as reducers from './reducers';
import * as enc from './workers/client';

const App = () => {
  const docs = useMemo(() => new DefaultApi(), []);
  const [state, setState] = useState(store);

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
                downloadFile={DownloadFile(state, setState, docs, enc, reducers)}
            />)
          }
        />
        <Route path="/">
          <Upload
            state={state.upload}
            encryptFile={EncryptFile(state, setState, enc, reducers)}
            uploadFile={UploadFile(state, setState, docs, reducers)}
          />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
