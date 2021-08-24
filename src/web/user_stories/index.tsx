import React, { useEffect, useMemo, useState } from "react"
import AddFiles from "./add_file"
import UploadFile from "./upload_file"
import DownloadFile from "./download_file"
import DeleteFile from "./delete_file"
import GetStats from "./get_stats"
import store from "../store"
import { createFileEncryptedDoc, createFileUploadedDoc, fileDecrypted, createDeleteFileDoc, createFileStatsDoc } from "../actions/documents"
import { decryptFile, encryptFile, DocumentsApi, StatsApi } from "../actions/commands"
import { DownloadAFileRequested, FileAdded, FileDeletionRequested, FileUploadRequested, FileStatsRequested } from "../actions/events"

export default function ({ app }) {
  const docs = useMemo(() => new DocumentsApi(), [])
  const stats = useMemo(() => new StatsApi(), [])
  const [state, setState] = useState(store)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    AddFiles.init(FileAdded, encryptFile, createFileEncryptedDoc, state, setState)
    UploadFile.init(FileUploadRequested, createFileUploadedDoc, docs.uploadDocuments.bind(docs), state, setState)
    DownloadFile.init(DownloadAFileRequested, decryptFile, fileDecrypted, docs.getDocument.bind(docs), state, setState)
    DeleteFile.init(FileDeletionRequested, createDeleteFileDoc, docs.deleteDocument.bind(docs), state, setState)
    GetStats.init(FileStatsRequested, createFileStatsDoc, stats.getDocumentStats.bind(stats), state, setState)
    setInitialized(true)
  }, []);

  if(!initialized) return <>Loading...</>

  return(app({state, events: { DownloadAFileRequested, FileAdded, FileUploadRequested, FileDeletionRequested, FileStatsRequested }}))
}
