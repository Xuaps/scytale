import { EncryptedFile } from "../core/model";

export type EncryptedFileView = Pick<
  EncryptedFile,
  "name" | "password" | "id"
> & { encryptedData: File };

export const toEncryptedFileView = (
  file: EncryptedFile
): EncryptedFileView => ({
  id: file.id,
  name: file.name,
  encryptedData: file.encryptedFile,
  password: file.password,
});
