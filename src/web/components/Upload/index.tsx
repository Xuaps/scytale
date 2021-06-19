import React, { useCallback } from "react";
import Layout from "../Layout";
import Uploader from "./Uploader";

const uploadFile = (file) => {
  const formData = new FormData();
  formData.append("document", file.encryptedFile);
  return fetch("http://localhost:3000/api/documents", {
    method: "POST",
    body: formData,
  });
};

const Upload = ({
  encryptedFiles,
  onFilesUploaded,
}: {
  encryptedFiles: {encryptedFile:File, name: string, password: string}[];
  onFilesUploaded: (files: File[]) => void;
}) => {
  return (
    <Layout>
      <Uploader onAddFiles={onFilesUploaded} />
      <ul>
        {encryptedFiles.map((f) => (
          <li key={f.name}>{f.name}</li>
        ))}
      </ul>
      <button onClick={() => uploadFile(encryptedFiles[0])}>send</button>

    </Layout>
  );
};

export default Upload;
