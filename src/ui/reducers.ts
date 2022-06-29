import { EncryptedFile } from "../core/model";

export type FileEncrypted = (
  files: EncryptedFile[],
  file: EncryptedFile
) => EncryptedFile[];

export const createFileEncryptedDoc: FileEncrypted = (files, file) => {
  return [...files, file];
};
