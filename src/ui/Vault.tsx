import React, { useState } from "react";
import { encryptedFiles } from "store";
import Layout from "./Layout";
import Uploader from "./Uploader";

import { EncryptedFileView, toEncryptedFileView } from "./mappers";
import { encryptFile } from "core/encryption";
import { EncryptedFile } from "./EncryptedFile";

const Upload = () => {
  const [file, setFile] = useState<EncryptedFileView>();
  const onFileAdded = async (file: File) => {
    const encryptedFile = await encryptFile(file);
    encryptedFiles.add(encryptedFile);
    setFile(toEncryptedFileView(encryptedFiles.getLast()));
  };

  return (
    <Layout>
      {file ? (
        <EncryptedFile file={file} />
      ) : (
        <Uploader onFileAdded={onFileAdded} />
      )}
    </Layout>
  );
};

export default Upload;
