import { decryptFile, encryptFile } from "core/encryption";
import { encryptedFiles } from "store";
import { DecryptedFile, EncryptedFile } from "../core/model";

export const isFileEncrypted = (file: File) =>
  file.name.indexOf(".scytale") > -1;

export const encryptNewFile = async (file: File): Promise<EncryptedFile> => {
  const encryptedFile = await encryptFile(file);
  encryptedFiles.add(encryptedFile);

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
