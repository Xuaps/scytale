import React, { useEffect, useCallback, useState } from "react";
import { Upload } from "./components/Upload";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const cypherWorker: Worker = new Worker("/assets/cypher.bundle.js");

function Preview() {
  return null;
}

const App = () => {
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    cypherWorker.onmessage = ($event: MessageEvent) => {
      if ($event && $event.data) {
        setFiles([...files, $event.data]);
      }
    };
  }, [cypherWorker]);

  const encryptAndAddFile = useCallback((files: File[]) => {
    cypherWorker.postMessage({
      file: files[0],
      password: "test",
      cmd: "encrypt"
    });
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/:id">
          <Preview />
        </Route>
        <Route path="/">
          <Upload files={files} onFilesUploaded={encryptAndAddFile} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
