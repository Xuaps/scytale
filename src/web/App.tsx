import React, { useEffect, useCallback, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Upload from "./components/Upload";
import Preview from "./components/Preview";
import Download from "./components/Download";

const cypherWorker: Worker = new Worker("/assets/cypher.bundle.js");

const App = () => {
  const [files, setFiles] = useState<{encryptedFile: File, name: string, password: string}[]>([]);
  const [selectedFile, setSelectedFile] = useState<File>();

  useEffect(() => {
    cypherWorker.onmessage = ($event: MessageEvent) => {
      if ($event && $event.data && $event.data.encryptedFile) {
        setFiles([...files, $event.data]);
      }
      if ($event && $event.data && $event.data.decryptedFile) {
        setSelectedFile($event.data.decryptedFile);
      }
    };
  }, [cypherWorker]);

  const encryptAndAddFile = useCallback((files: File[]) => {
    cypherWorker.postMessage({
      file: files[0],
      password: "test",
      cmd: "encrypt",
    });
  }, []);

  const decryptAndSelectFile = useCallback((file: Blob, password) => {
    cypherWorker.postMessage({
      file,
      password,
      cmd: "decrypt",
    });
  }, []);

  return (
    <Router>
      <Switch>
        <Route
          path="/:id/"
          children={({ location, match }) => {
            if (selectedFile) return <Preview file={selectedFile} />;
            return (
              <Download
                id={match.params.id}
                password={location.hash.substring(1)}
                decryptAndSelectFile={decryptAndSelectFile}
              />
            );
          }}
        />
        <Route path="/">
          <Upload files={files} onFilesUploaded={encryptAndAddFile} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
