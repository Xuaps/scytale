import React, { useState } from "react";
import { EncryptedFile } from "../../model";
import Layout from "../Layout";
import Uploader from "./Uploader";

import { createFileEncryptedDoc } from "../../actions/documents";
import { encryptFile } from "domain/encryption";
import { Form, InputGroup, Table } from "react-bootstrap";

const Upload = () => {
  const [files, setFiles] = useState<EncryptedFile[]>([]);
  const onFileAdded = async (file: File) => {
    const encryptedFile = await encryptFile(file);
    const doc = createFileEncryptedDoc(files, encryptedFile);
    setFiles(doc);
  };

  return (
    <Layout>
      <Uploader onFileAdded={onFileAdded} />
      <br />
      <Table>
        <thead>
          <tr>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {files.map((f) => (
            <tr key={f.id}>
              <td className="input-group">
                <InputGroup>
                  <Form.Control
                    id={`password-${f.id}`}
                    className="form-control"
                    type="password"
                    value={f.password}
                  />
                  <InputGroup.Text>
                    <i className="bi bi-eye-slash"></i>
                  </InputGroup.Text>
                </InputGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ul></ul>
    </Layout>
  );
};

export default Upload;
