import { EncryptedFile } from "../core/model";

function encryptedFilesFn() {
  let filesCollection: EncryptedFile[] = JSON.parse(
    localStorage.getItem("encryptedFiles") || "[]"
  );

  return {
    get: () => filesCollection,
    add: (file: EncryptedFile) => {
      filesCollection = [...filesCollection, file];
      localStorage.setItem("encryptedFiles", JSON.stringify(filesCollection));
    },
  };
}

export const encryptedFiles = encryptedFilesFn();
