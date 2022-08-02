import { encryptFile } from "core/encryption";
import { encryptedFiles } from "store";
import { DecryptedFile, EncryptedFile } from "../core/model";

export const isFileEncrypted = (file: File) =>
  file.name.indexOf(".scytale") > -1;

export const encryptNewFile = async (file: File): Promise<EncryptedFile> => {
  const encryptedFile = await encryptFile(file);
  encryptedFiles.add(encryptedFile);

  return encryptedFiles.getLast();
};

export const decryptNewFile = async (file: File): Promise<DecryptedFile> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: "test.file",
        decryptedFile: file,
      });
    }, 1000);
  });
};
