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

type EncryptedFileState = {
  kind: "download_encrypted_file";
  file: EncryptedFileView;
};

type DecryptedFileState = {
  kind: "download_decrypted_file";
  file: DecryptedFileView;
};

type LoadingState = {
  kind: "loading";
  file: File;
};

type VaultState =
  | {
      kind: "upload";
    }
  | LoadingState
  | EncryptedFileState
  | DecryptedFileState;

const nextState = (
  currentState: VaultState,
  file?: File,
  encryptedFile?: EncryptedFileView,
  decryptedFile?: DecryptedFileView
): VaultState => {
  switch (currentState.kind) {
    case "upload":
      return { kind: "loading", file };
    case "loading": {
      console.log(encryptedFile, decryptedFile);
      if (encryptedFile) {
        return { kind: "download_encrypted_file", file: encryptedFile };
      } else {
        return { kind: "download_decrypted_file", file: decryptedFile };
      }
    }
    case "download_encrypted_file":
      return { kind: "upload" };
    case "download_decrypted_file":
      return { kind: "upload" };
    default:
      return currentState;
  }
};

const Vault = () => {
  const [state, setState] = useState<VaultState>({ kind: "upload" });

  const onFileAdded = async (file: File) => {
    setState(nextState(state, file));
  };

  const processFile = async (file: File) => {
    if (isFileEncrypted(file)) {
      setTimeout(() => {
        setState(
          nextState(
            state,
            undefined,
            undefined,
            toDecryptedFileView({
              name: "test.file",
              decryptedFile: file,
            })
          )
        );
      }, 1000);
    } else {
      const encryptedFile = await encryptFile(file);
      encryptedFiles.add(encryptedFile);
      setState(
        nextState(
          state,
          undefined,
          toEncryptedFileView(encryptedFiles.getLast())
        )
      );
    }
  };

  return (
    <Layout>
      <Row>
        <Col className="col-md-6 offset-md-3">
          {state.kind === "loading" && (
            <div className="text-center" onLoad={() => processFile(state.file)}>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
                onLoad={() => processFile(state.file)}
              />
              <Spinner
                data-testid="spinner"
                style={{ width: "20rem", height: "20rem" }}
                animation="grow"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
          {state.kind === "download_encrypted_file" && (
            <>
              <EncryptedFile file={state.file} />
              <Row>
                <Col className="col-md-2 offset-5" style={{ marginTop: 10 }}>
                  <Button
                    className="self-align-center"
                    onClick={() => setState(nextState(state))}
                  >
                    Start
                  </Button>
                </Col>
              </Row>
            </>
          )}
          {state.kind === "download_decrypted_file" && (
            <>
              <DecryptedFile file={state.file} />
              <Row>
                <Col className="col-md-2 offset-5" style={{ marginTop: 10 }}>
                  <Button
                    className="self-align-center"
                    onClick={() => setState(nextState(state))}
                  >
                    Start
                  </Button>
                </Col>
              </Row>
            </>
          )}
          {state.kind === "upload" && <Uploader onFileAdded={onFileAdded} />}
        </Col>
      </Row>
    </Layout>
  );
};

export default Vault;
