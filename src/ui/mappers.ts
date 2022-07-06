import { EncryptedFile } from "../core/model";

export type EncryptedFileView = Pick<EncryptedFile, "name" | "password" | "id">;

export const toEncryptedFileView = (
  file: EncryptedFile
): EncryptedFileView => ({
  id: file.id,
  name: file.name,
  password: file.password,
});
