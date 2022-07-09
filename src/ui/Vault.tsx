import React, { useState } from "react";
import { encryptedFiles } from "store";
import Layout from "./Layout";
import Uploader from "./Uploader";

import { EncryptedFileView, toEncryptedFileView } from "./mappers";
import { encryptFile } from "core/encryption";
import { EncryptedFile } from "./EncryptedFile";
import { Row, Col, Button } from "react-bootstrap";

const Upload = () => {
  const [file, setFile] = useState<EncryptedFileView>();
  const onFileAdded = async (file: File) => {
    const encryptedFile = await encryptFile(file);
    encryptedFiles.add(encryptedFile);
    setFile(toEncryptedFileView(encryptedFiles.getLast()));
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
          ) : (
            <Uploader onFileAdded={onFileAdded} />
          )}
        </Col>
      </Row>
    </Layout>
  );
};

export default Upload;
