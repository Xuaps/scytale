import * as Comlink from "comlink";

const Cypher = Comlink.wrap<{
  encryptFile: (
    file: File,
    password: string
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
}>(new Worker("/assets/cypher.bundle.js"));

export const encryptFile = Cypher.encryptFile;
export const decryptFile = Cypher.decryptFile;
export * from "./gen";
