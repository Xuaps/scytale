import React, { useEffect, useCallback, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Upload from "./components/Upload";
import Preview from "./components/Preview";
import Download from "./components/Download";

const cypherWorker: Worker = new Worker("/assets/cypher.bundle.js");

const App = () => {
  const [encryptedFiles, setEncryptedFiles] = useState<
    { encryptedFile: File; name: string; password: string }[]
  >([]);
  const [uploadedFiles, setUploadedFiles] = useState<
    { id: string; password: string, name: string }[]
  >(JSON.parse(localStorage.getItem("files")) || []);
  const [selectedFile, setSelectedFile] = useState<File>();

  useEffect(() => {
    cypherWorker.onmessage = ($event: MessageEvent) => {
      if ($event && $event.data && $event.data.encryptedFile) {
        setEncryptedFiles([...encryptedFiles, $event.data]);
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

  const addFilesToLocalStorage = (files) => {
    const nextFiles = [...uploadedFiles, ...files]
    setUploadedFiles(nextFiles);
    setEncryptedFiles([]);
    localStorage.setItem("files", JSON.stringify(nextFiles));
  };

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
          <Upload
            encryptedFiles={encryptedFiles}
            onAddFiles={encryptAndAddFile}
            uploadedFiles={uploadedFiles}
            onUploadFiles={addFilesToLocalStorage}
          />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
