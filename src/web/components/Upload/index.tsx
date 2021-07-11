import React from "react";
import Layout from "../Layout";
import Uploader from "./Uploader";
import { EncryptFile, UploadFile, UploadState } from "../../model";

const Upload = ({
  state: { encryptedFiles, uploadedFiles },
  encryptFile,
  uploadFile,
}: {
  state: UploadState;
  encryptFile: EncryptFile;
  uploadFile: UploadFile;
}) => {
  return (
    <Layout>
      <Uploader onAddFile={encryptFile} />
      <ul>
        {encryptedFiles.map((f) => (
          <li key={f.name}>{f.name}</li>
        ))}
      </ul>
      <button onClick={() => uploadFile.execute(encryptedFiles[0])}>send</button>
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
