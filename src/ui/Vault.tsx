import React, { useState } from "react";
import { encryptedFiles } from "store";
import Layout from "./Layout";
import Uploader from "./Uploader";

import { EncryptedFileView, toEncryptedFileView } from "./mappers";
import { encryptFile } from "core/encryption";
import { Form, InputGroup, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const Upload = () => {
  const [files, setFiles] = useState<EncryptedFileView[]>(
    encryptedFiles.get().map(toEncryptedFileView)
  );
  const onFileAdded = async (file: File) => {
    const encryptedFile = await encryptFile(file);
    encryptedFiles.add(encryptedFile);
    setFiles(encryptedFiles.get().map(toEncryptedFileView));
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
                <a href={URL.createObjectURL(f.encryptedData)} download>
                  Download original file
                </a>
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
