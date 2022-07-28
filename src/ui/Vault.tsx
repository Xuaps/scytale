import React, { useState } from "react";
import Layout from "./Layout";
import Uploader from "./Uploader";
import { DecryptedFileView, EncryptedFileView, mapToView } from "./mappers";
import { EncryptedFile } from "./EncryptedFile";
import { DecryptedFile } from "./DecryptedFile";
import { Row, Col, Button } from "react-bootstrap";
import { Spinner } from "./Spinner";
import { processFile } from "../actions/process-file";

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
  processedFile?: File | EncryptedFileView | DecryptedFileView
): VaultState => {
  switch (currentState.kind) {
    case "upload": {
      return { kind: "loading", file: processedFile as File };
    }
    case "loading": {
      if ("password" in processedFile) {
        return { kind: "download_encrypted_file", file: processedFile };
      } else {
        return {
          kind: "download_decrypted_file",
          file: processedFile as DecryptedFileView,
        };
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

  return (
    <Layout>
      <Row>
        <Col className="col-md-6 offset-md-3">
          {state.kind === "loading" && (
            <div className="text-center">
              <Spinner
                onLoad={async () =>
                  setState(
                    nextState(state, mapToView(await processFile(state.file)))
                  )
                }
              />
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
