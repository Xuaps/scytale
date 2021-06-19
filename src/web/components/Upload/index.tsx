import React, { useCallback } from "react";
import Layout from "../Layout";
import Uploader from "./Uploader";

const uploadFile = (file) => {
  const formData = new FormData();
  formData.append("document", file.encryptedFile);
  return fetch("http://localhost:3000/api/documents", {
    method: "POST",
    body: formData,
  }).then((res) => res.json());
};
//
const Upload = ({
  encryptedFiles,
  uploadedFiles,
  onAddFiles,
  onUploadFiles,
}: {
  encryptedFiles: { encryptedFile: File; name: string; password: string }[];
  uploadedFiles: { id: string; password: string; name: string }[];
  onAddFiles: (files: File[]) => void;
  onUploadFiles: (
    files: { name: string; password: string; id: string }[]
  ) => void;
}) => {
  return (
    <Layout>
      <Uploader onAddFiles={onAddFiles} />
      <ul>
        {encryptedFiles.map((f) => (
          <li key={f.name}>{f.name}</li>
        ))}
      </ul>
      <button
        onClick={() =>
          uploadFile(encryptedFiles[0]).then((res: { id: string }) =>
            onUploadFiles([
              {
                id: res.id,
                name: encryptedFiles[0].name,
                password: encryptedFiles[0].password,
              },
            ])
          )
        }
      >
        send
      </button>
      <br />
      <ul>
        {uploadedFiles.map((f) => (
          <li key={f.id}>
            <a href={`${f.id}#${f.password}`}>{f.name}</a>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Upload;
