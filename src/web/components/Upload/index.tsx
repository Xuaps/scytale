import React, { useCallback } from "react";
import Layout from "../Layout";
import Uploader from "./Uploader";
import { EncryptedFile, UploadedFile } from "../../model";

const Upload = ({
                  state: { encryptedFiles, uploadedFiles },
                  actions: { encryptFile, uploadFile }
                }) => {
  return (
    <Layout>
      <Uploader onAddFile={encryptFile} />
      <ul>
        {encryptedFiles.map((f) => (
          <li key={f.name}>{f.name}</li>
        ))}
      </ul>
      <button
        onClick={() =>
          uploadFile(encryptedFiles[0])
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
