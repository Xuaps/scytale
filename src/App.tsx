/* eslint-disable react/no-children-prop */
import React, { useEffect, useMemo, useState } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  PathMatch,
} from "react-router-dom";
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
  const [loading, setLoading] = useState(true);
  const docs = useMemo(
    () =>
      new DocumentsApi(
        new Configuration({
          basePath: `https://xuaps-apim-development-we.azure-api.net/doc`,
        })
      ),
    []
  );
  const stats = useMemo(
    () =>
      new StatsApi(
        new Configuration({
          basePath: `https://xuaps-apim-development-we.azure-api.net/doc`,
        })
      ),
    []
  );
  const FileStatsRequested = useGetStats(
    createFileStatsDoc,
    stats.getDocumentStats.bind(stats),
    setState
  );
  const FileUploadRequested = useUploadFile(
    createFileUploadedDoc,
    docs.uploadDocuments.bind(docs),
    setState
  );
  const FileDeletionRequested = useDeleteFile(
    createDeleteFileDoc,
    docs.deleteDocument.bind(docs),
    setState
  );
  const DownloadAFileRequested = useDownloadFile(
    decryptFile,
    createDownloadFileDoc,
    docs.getDocument.bind(docs),
    setState
  );
  const FileAdded = useAddFile(encryptFile, createFileEncryptedDoc, setState);

  useEffect(() => {
    setLoading(
      !(
        FileStatsRequested.observed &&
        FileUploadRequested.observed &&
        FileDeletionRequested.observed &&
        DownloadAFileRequested.observed &&
        FileAdded.observed
      )
    );
  }, [
    FileStatsRequested.observed,
    FileUploadRequested.observed,
    FileDeletionRequested.observed,
    DownloadAFileRequested.observed,
    FileAdded.observed,
  ]);

  if (loading) return <div>Loading ...</div>;
  return (
    <Router>
      <Routes>
        <Route
          path="/stats/:id/"
          children={({ match }: { match: PathMatch<string> }) => (
            <Stats
              id={match.params.id}
              state={state.file_stats}
              onLoad={(file) => FileStatsRequested.next({ file, state })}
            />
          )}
        />
        <Route
          path="/:id/:password"
          children={({ match }: { match: PathMatch<string> }) => (
            <Download
              id={match.params.id}
              password={match.params.password}
              state={state.download}
              onRender={(file) => DownloadAFileRequested.next({ file, state })}
            />
          )}
        />
        <Route
          path="/"
          element={
            <Upload
              state={state.upload}
              onAddFile={(file: File) => FileAdded.next({ file, state })}
              onFileUpload={(file) => FileUploadRequested.next({ file, state })}
              onDeleteFile={(file) =>
                FileDeletionRequested.next({ file, state })
              }
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
