import React, { useCallback, useMemo, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as Components from "./components";
import { withAITracking } from "@microsoft/applicationinsights-react-js";
import { reactPlugin, appInsights } from "./app-insight";
import store from "./store";
import { useAddFile, useDeleteFile, useDownloadFile, useGetStats, useUploadFile } from "./user_stories";
import {
  createDeleteFileDoc,
  createFileEncryptedDoc,
  createFileStatsDoc,
  createFileUploadedDoc,
  createDownloadFileDoc,
} from "./actions/documents";
import { Configuration, decryptFile, DocumentsApi, encryptFile, StatsApi } from "./actions/commands";

const Upload = withAITracking(reactPlugin, Components.Upload);
const Download = withAITracking(reactPlugin, Components.Download);
const Stats = withAITracking(reactPlugin, Components.Stats);
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
  const FileStatsRequested = useGetStats(createFileStatsDoc, stats.getDocumentStats.bind(stats), setState);
  const FileUploadRequested = useUploadFile(createFileUploadedDoc, docs.uploadDocuments.bind(docs), setState);
  const FileDeletionRequested = useDeleteFile(createDeleteFileDoc, docs.deleteDocument.bind(docs), setState);
  const DownloadAFileRequested = useDownloadFile(
    decryptFile,
    createDownloadFileDoc,
    docs.getDocument.bind(docs),
    setState
  );
  const FileAdded = useAddFile(encryptFile, createFileEncryptedDoc, setState);

  return (
    <Router>
      <Switch>
        <Route
          path="/stats/:id/"
          children={({ match }) => (
            <Stats
              id={match.params.id}
              state={state.file_stats}
              onLoad={(file) => FileStatsRequested.next({ file, state })}
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
              onRender={(file) => DownloadAFileRequested.next({ file, state })}
            />
          )}
        />
        <Route path="/">
          <Upload
            state={state.upload}
            onAddFile={(file: File) => FileAdded.next({ file, state })}
            onFileUpload={(file) => FileUploadRequested.next({ file, state })}
            onDeleteFile={(file) => FileDeletionRequested.next({ file, state })}
          />
        </Route>
      </Switch>
    </Router>
  );
};

export default withAITracking(reactPlugin, App);
