import { EncryptedFile } from "../core/model";

function encryptedFilesFn() {
  let filesCollection: EncryptedFile[] = [];

  return {
    getLast: () => filesCollection[filesCollection.length - 1],
    add: (file: EncryptedFile) => {
      filesCollection = [...filesCollection, file];
    },
  };
}

export const encryptedFiles = encryptedFilesFn();
