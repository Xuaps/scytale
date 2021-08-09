import React, { useEffect, useMemo, useState } from "react";
import AddFiles from "./add_file";
import UploadFile from "./upload_file";
import DownloadFile from "./download_file";
import { DefaultApi } from "../../../gen";
import store from "../store";
import { createFileEncryptedDoc, createFileUploadedDoc, fileDecrypted } from "../actions/documents";
import { decryptFile, encryptFile } from "../actions/commands";
import { DownloadAFileRequested, FileAdded, FileUploadRequested } from "../actions/events";

export default function ({ app }) {
  const docs = useMemo(() => new DefaultApi(), []);
  const [state, setState] = useState(store);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    AddFiles.init(FileAdded, encryptFile, createFileEncryptedDoc, state, setState);
    UploadFile.init(FileUploadRequested, createFileUploadedDoc, docs.uploadDocuments.bind(docs), state, setState);
    DownloadFile.init(DownloadAFileRequested, decryptFile, fileDecrypted, docs.getDocument.bind(docs), state, setState);
    setInitialized(true)
  }, []);

  if(!initialized) return <>Loading...</>

  return(app({state, events: { DownloadAFileRequested, FileAdded, FileUploadRequested }}));
}
