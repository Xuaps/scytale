import React, { useState } from "react";
import { encryptedFiles } from "store";
import Layout from "./Layout";
import Uploader from "./Uploader";

import { EncryptedFileView, toEncryptedFileView } from "./mappers";
import { encryptFile } from "core/encryption";
import { EncryptedFile } from "./EncryptedFile";
import { Row, Col, Button, Spinner } from "react-bootstrap";

const Upload = () => {
  const [file, setFile] = useState<EncryptedFileView>();
  const [loading, setLoading] = useState(false);
  const onFileAdded = async (file: File) => {
    setLoading(true);

    const encryptedFile = await encryptFile(file);
    encryptedFiles.add(encryptedFile);

    setFile(toEncryptedFileView(encryptedFiles.getLast()));
    setLoading(false);
  };

  return (
    <Layout>
      <Row>
        <Col className="col-md-6 offset-md-3">
          {file ? (
            <>
              <EncryptedFile file={file} />
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

export default Upload;
