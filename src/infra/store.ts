import { EncryptedFile } from "../core/model";

function encryptedFilesFn() {
  let filesCollection: EncryptedFile[] = [];

  return {
    get: () => filesCollection,
    add: (file: EncryptedFile) => {
      filesCollection = [...filesCollection, file];
    },
  };
}

export const encryptedFiles = encryptedFilesFn();
