import React, { useCallback, useMemo, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Upload, Download, Stats } from "./components";
import store from "./store";
import {
  useAddFile,
  useDeleteFile,
  useDownloadFile,
  useGetStats,
  useUploadFile,
} from "./user_stories";
import {
  createDeleteFileDoc,
  createFileEncryptedDoc,
  createFileStatsDoc,
  createFileUploadedDoc,
  createDownloadFileDoc,
} from "./actions/documents";
import {
  Configuration,
  decryptFile,
  DocumentsApi,
  encryptFile,
  StatsApi,
} from "./actions/commands";

const App = () => {
  const [state, setState] = useState(store);
  const docs = useMemo(
    () =>
      new DocumentsApi(
        new Configuration({
          basePath: `${window.location.protocol}//${window.location.host}/api`,
        })
      ),
    []
  );
  const stats = useMemo(
    () =>
      new StatsApi(
        new Configuration({
          basePath: `${window.location.protocol}//${window.location.host}/api`,
        })
      ),
    []
  );
  const FileStatsRequested = useGetStats(
    createFileStatsDoc,
    stats.getDocumentStats.bind(stats),
    state,
    setState
  );
  const FileUploadRequested = useUploadFile(
    createFileUploadedDoc,
    docs.uploadDocuments.bind(docs),
    state,
    setState
  );
  const FileDeletionRequested = useDeleteFile(
    createDeleteFileDoc,
    docs.deleteDocument.bind(docs),
    state,
    setState
  );
  const DownloadAFileRequested = useDownloadFile(
    decryptFile,
    createDownloadFileDoc,
    docs.getDocument.bind(docs),
    state, 
    setState
  );
  const FileAdded = useAddFile(
    encryptFile,
    createFileEncryptedDoc,
    state,
    setState
  );

  return (
    <Router>
      <Switch>
        <Route
          path="/stats/:id/"
          children={({ match }) => (
            <Stats
              id={match.params.id}
              state={state.file_stats}
              onLoad={FileStatsRequested}
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
              onRender={DownloadAFileRequested}
            />
          )}
        />
        <Route path="/">
          <Upload
            state={state.upload}
            onAddFile={FileAdded}
            onFileUpload={FileUploadRequested}
            onDeleteFile={FileDeletionRequested}
          />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
