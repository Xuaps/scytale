import React from "react";
import { Link } from 'react-router-dom'
import Layout from "../Layout";
import Uploader from "./Uploader";
import { EncryptedFile, SharedFile } from "../../model";
import { UploadState } from "../../store";

const Upload = ({
  state: { encryptedFiles, uploadedFiles },
  onFileUpload,
  onAddFile,
  onDeleteFile,
}: {
  state: UploadState
  onFileUpload: (file: EncryptedFile) => void
  onAddFile: (file: File) => void
  onDeleteFile: (file: SharedFile) => void
}) => {
  return (
    <Layout>
      <Uploader onAddFile={onAddFile} />
      <ul>
        {encryptedFiles.map((f) => (
          <li key={f.name}>{f.name}</li>
        ))}
      </ul>
      <button onClick={() => onFileUpload(encryptedFiles[0])}>send</button>
      <br />
      <ul>
        {uploadedFiles.map((f) => (
          <li key={f.id}>
            <Link to={`${f.id}/${encodeURIComponent(f.password)}`}>{f.name}</Link>&nbsp;
            <Link to={`/stats/${f.id}`}>stats</Link>&nbsp;
            <button onClick={() => onDeleteFile(f)}>Delete</button>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Upload;
