import React, { useState, useEffect } from "react";
import { map, mergeMap } from "rxjs";
import { EncryptedFile } from "../../model";
import Layout from "../Layout";
import Uploader from "./Uploader";

import { FileAdded } from "../../actions/events";
import { createFileEncryptedDoc } from "../../actions/documents";
import { encryptFile } from "domain/encryption";

const Upload = () => {
  const [files, setFiles] = useState<EncryptedFile[]>([]);
  const onFileAdded = (file: File) => {
    FileAdded.next(file);
  };

  useEffect(() => {
    FileAdded.pipe(
      mergeMap(async (file) => await encryptFile(file)),
      map((file) => createFileEncryptedDoc(files, file))
    ).subscribe({
      next: (doc) => setFiles(doc),
      error: () => {
        return;
      },
    });
  }, []);

  return (
    <Layout>
      <Uploader onFileAdded={onFileAdded} />
      <br />
      <ul>
        {files.map((f) => (
          <li key={f.id}>
            <div className="form-group">
              <label htmlFor={`password-${f.id}`}>Password</label>
              <div className="input-group">
                <input
                  id={`password-${f.id}`}
                  className="form-control"
                  type="password"
                  value={f.password}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Upload;
