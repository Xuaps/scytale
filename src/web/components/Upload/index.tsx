import React, { useCallback } from "react";
import Layout from "../Layout";
import Uploader from "./Uploader";

const uploadFiles = (files) => {
  const formData = new FormData();
  formData.append("document", files[0].encryptedFile);
  return fetch(
    "http://localhost:3000/api/documents",
    {
      method: "POST",
      body: formData
    });
}

export const Upload = ({ files, onFilesUploaded } : { files: File[], onFilesUploaded: (files: File[]) => void}) => {
  return (
    <Layout>
      <Uploader onAddFiles={onFilesUploaded} />
      <ul>
        {files.map(f => <li key={f.name}>{f.name}</li>)}
      </ul>
      <button onClick={() => uploadFiles(files)}>send
      </button>
    </Layout>
);
}
