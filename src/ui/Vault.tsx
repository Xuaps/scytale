import React, { useState } from "react";
import { EncryptedFile } from "../core/model";
import Layout from "./Layout";
import Uploader from "./Uploader";

import { createFileEncryptedDoc } from "./reducers";
import { encryptFile } from "core/encryption";
import { Form, InputGroup, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

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
              <td>{f.name}</td>
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
              <td>
                <Link to="">Download original file</Link>
              </td>
              <td>
                <Link to="">Download encrypted file</Link>
              </td>
              <td>Share file</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ul></ul>
    </Layout>
  );
};

export default Upload;
