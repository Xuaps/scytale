import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import Uploader from "./Uploader";
import {
  DecryptedFileView,
  EncryptedFileView,
  toDecryptedFileView,
  toEncryptedFileView,
} from "./mappers";
import { EncryptedFile } from "./EncryptedFile";
import { DecryptedFile } from "./DecryptedFile";
import { Row, Col, Button } from "react-bootstrap";
import { Spinner } from "./Spinner";
import {
  decryptNewFile,
  encryptNewFile,
  isFileEncrypted,
} from "../actions/process-file";
import { Password } from "./Password";
import { tracer } from "../tracing";
import { trace, context } from "@opentelemetry/api";

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
  password?: string;
};

type AskPasswordState = {
  kind: "ask_password";
  file: File;
};

type VaultState =
  | {
      kind: "upload";
    }
  | AskPasswordState
  | LoadingState
  | EncryptedFileState
  | DecryptedFileState;

const nextState = (
  currentState: VaultState,
  processedFile?: File | EncryptedFileView | DecryptedFileView,
  password?: string
): VaultState => {
  switch (currentState.kind) {
    case "upload": {
      if (!(processedFile instanceof File)) return currentState;

      if (isFileEncrypted(processedFile)) {
        return { kind: "ask_password", file: processedFile };
      } else {
        return { kind: "loading", file: processedFile };
      }
    }
    case "ask_password": {
      if (!(processedFile instanceof File)) return currentState;

      return { kind: "loading", file: processedFile, password };
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

const rootSpan = tracer.startSpan("Vault");
const ctx = trace.setSpan(context.active(), rootSpan);

const Vault = () => {
  useEffect(() => {
    rootSpan.end();
  }, []);

  const [state, setState] = useState<VaultState>({ kind: "upload" });

  const onFileAdded = async (file: File) => {
    const span = tracer.startSpan("onFileAdded", undefined, ctx);
    setState(nextState(state, file));
    span.end();
  };

  const processFile = async () => {
    if (state.kind !== "loading") return;

    if (isFileEncrypted(state.file)) {
      const span = tracer.startSpan("decryptNewFile", undefined, ctx);
      const decriptedFile = toDecryptedFileView(
        await decryptNewFile(state.file, state.password)
      );
      span.setAttribute("file.name", decriptedFile.name);
      span.end();

      return decriptedFile;
    } else {
      const span = tracer.startSpan("encryptNewFile", undefined, ctx);
      const encryptedFile = toEncryptedFileView(
        await encryptNewFile(state.file)
      );
      span.setAttribute("file.name", state.file.name);
      span.end();

      return encryptedFile;
    }
  };

  return (
    <Layout>
      <Row>
        <Col className="col-md-6 offset-md-3">
          {state.kind === "ask_password" && (
            <Password
              onPassword={(password) =>
                setState(nextState(state, state.file, password))
              }
            />
          )}
          {state.kind === "loading" && (
            <div className="text-center">
              <Spinner
                onLoad={async () =>
                  setState(nextState(state, await processFile()))
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
