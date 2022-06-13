import * as Comlink from "comlink";

const Cypher = Comlink.wrap<{
  encryptFile: (
    file: File
  ) => Promise<{
    id: string;
    encryptedFile: File;
    name: string;
    password: string;
  }>;
  decryptFile: (
    id: string,
    file: File,
    password: string
  ) => Promise<{ name: string; decryptedFile: File }>;
}>(new Worker(new URL("../../workers/cypher.ts", import.meta.url)));

export const encryptFile = Cypher.encryptFile;
export const decryptFile = Cypher.decryptFile;
export * from "./gen";
