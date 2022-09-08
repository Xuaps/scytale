import { trace, context } from "@opentelemetry/api";
import { decryptFile, encryptFile } from "core/encryption";
import { encryptedFiles } from "store";
import { DecryptedFile, EncryptedFile } from "../core/model";

export const isFileEncrypted = (file: File) =>
  file.name.indexOf(".scytale") > -1;

export const encryptNewFile = async (file: File): Promise<EncryptedFile> => {
  const tracer = trace.getTracer("scytale", "1.0.0");
  const root_span = tracer.startSpan("encryptNewFile");
  await context.with(trace.setSpan(context.active(), root_span), async () => {
    const span = tracer.startSpan("file encription", {
      attributes: {
        fileName: file.name,
      },
    });
    const encryptedFile = await encryptFile(file);
    encryptedFiles.add(encryptedFile);
    span.end();
  });

  return encryptedFiles.getLast();
};

export const decryptNewFile = async (
  file: File,
  password: string
): Promise<DecryptedFile> => {
  const fileID = file.name.split(".")[0];
  const decryptedFile = await decryptFile(fileID, file, password);

  return decryptedFile;
};
