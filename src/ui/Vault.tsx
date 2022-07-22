import React, { useState } from "react";
import { encryptedFiles } from "store";
import Layout from "./Layout";
import Uploader from "./Uploader";
import {
  DecryptedFileView,
  EncryptedFileView,
  toEncryptedFileView,
  toDecryptedFileView,
} from "./mappers";
import { encryptFile } from "core/encryption";
import { EncryptedFile } from "./EncryptedFile";
import { DecryptedFile } from "./DecryptedFile";
import { Row, Col, Button, Spinner } from "react-bootstrap";

const isFileEncrypted = (file: File) => file.name.indexOf(".scytale") > -1;
const processFile = async (
  file: File
): Promise<EncryptedFileView | DecryptedFileView> => {
  if (isFileEncrypted(file)) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          toDecryptedFileView({ name: "test.file", decryptedFile: file })
        );
      }, 1000);
    });
  } else {
    const encryptedFile = await encryptFile(file);
    encryptedFiles.add(encryptedFile);

    return toEncryptedFileView(encryptedFiles.getLast());
  }
};

const Vault = () => {
  const [file, setFile] = useState<EncryptedFileView | DecryptedFileView>();
  const [loading, setLoading] = useState(false);
  const onFileAdded = async (file: File) => {
    setLoading(true);

    const processedFile = await processFile(file);

    setFile(processedFile);
    setLoading(false);
  };

  return (
    <Layout>
      <Row>
        <Col className="col-md-6 offset-md-3">
          {file ? (
            <>
              {"password" in file ? (
                <EncryptedFile file={file} />
              ) : (
                <DecryptedFile file={file} />
              )}
              <Row>
                <Col className="col-md-2 offset-5" style={{ marginTop: 10 }}>
                  <Button
                    className="self-align-center"
                    onClick={() => setFile(null)}
                  >
                    Start
                  </Button>
                </Col>
              </Row>
            </>
          ) : loading ? (
            <div className="text-center">
              <Spinner
                data-testid="spinner"
                style={{ width: "20rem", height: "20rem" }}
                animation="grow"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <Uploader onFileAdded={onFileAdded} />
          )}
        </Col>
      </Row>
    </Layout>
  );
};

export default Vault;
