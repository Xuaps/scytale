import { encryptFile } from "core/encryption";
import { encryptedFiles } from "store";
import { DecryptedFile, EncryptedFile } from "../core/model";

export const isFileEncrypted = (file: File) =>
  file.name.indexOf(".scytale") > -1;

export const processFile = async (
  file: File
): Promise<DecryptedFile | EncryptedFile> => {
  if (isFileEncrypted(file)) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: "test.file",
          decryptedFile: file,
        });
      }, 1000);
    });
  } else {
    const encryptedFile = await encryptFile(file);
    encryptedFiles.add(encryptedFile);

    return encryptedFiles.getLast();
  }
};
