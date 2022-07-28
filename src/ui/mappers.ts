import { DecryptedFile, EncryptedFile } from "../core/model";

export type EncryptedFileView = Pick<
  EncryptedFile,
  "name" | "password" | "id"
> & { encryptedData: File };

export type DecryptedFileView = Pick<DecryptedFile, "name"> & {
  decryptedData: File;
};

const toEncryptedFileView = (file: EncryptedFile): EncryptedFileView => ({
  id: file.id,
  name: file.name,
  encryptedData: file.encryptedFile,
  password: file.password,
});

const toDecryptedFileView = (file: DecryptedFile): DecryptedFileView => ({
  name: file.name,
  decryptedData: file.decryptedFile,
});

export const mapToView = (
  file: EncryptedFile | DecryptedFile
): EncryptedFileView | DecryptedFileView => {
  if ("password" in file) {
    return toEncryptedFileView(file);
  } else {
    return toDecryptedFileView(file);
  }
};
