import React from "react";
import Layout from "../Layout";
import Uploader from "./Uploader";
import { EncryptedFile } from "../../model";
import { Subject } from "rxjs";
import { UploadState } from "../../store";

const Upload = ({
  state: { encryptedFiles, uploadedFiles },
  onFileUpload,
  onAddFile,
}: {
  state: UploadState;
  onFileUpload: Subject<EncryptedFile>;
  onAddFile: Subject<File>
}) => {
  return (
    <Layout>
      <Uploader onAddFile={onAddFile} />
      <ul>
        {encryptedFiles.map((f) => (
          <li key={f.name}>{f.name}</li>
        ))}
      </ul>
      <button onClick={() => onFileUpload.next(encryptedFiles[0])}>send</button>
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
