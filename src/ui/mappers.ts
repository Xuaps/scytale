import { DecryptedFile, EncryptedFile } from "../core/model";

export type EncryptedFileView = Pick<
  EncryptedFile,
  "name" | "password" | "id"
> & { encryptedData: File };

export type DecryptedFileView = Pick<DecryptedFile, "name"> & {
  decryptedData: File;
};

export const toEncryptedFileView = (
  file: EncryptedFile
): EncryptedFileView => ({
  id: file.id,
  name: file.name,
  encryptedData: file.encryptedFile,
  password: file.password,
});

export const toDecryptedFileView = (
  file: DecryptedFile
): DecryptedFileView => ({
  name: file.name,
  decryptedData: file.decryptedFile,
});
