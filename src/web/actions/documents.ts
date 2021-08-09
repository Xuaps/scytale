import { DecryptedFile, EncryptedFile, UploadedFile } from "../model";
import { State } from "../store";

export type FileUploaded = (state: State, files: UploadedFile[]) => State;
export type FileEncrypted = (state: State, file: EncryptedFile) => State;
export type FileDecrypted = (state: State, file: DecryptedFile) => State;

export const createFileEncryptedDoc: FileEncrypted = (state, file) => ({
  ...state,
  upload: {
    ...state.upload,
    encryptedFiles: [...state.upload.encryptedFiles, file],
  },
});

export const createFileUploadedDoc: FileUploaded = (state, files) => {
  const nextFiles = [...state.upload.uploadedFiles, ...files];

  return {
    ...state,
    upload: {
      ...state.upload,
      uploadedFiles: nextFiles,
      encryptedFiles: [],
    },
  };
};

export const fileDecrypted: FileDecrypted = (state, file) => ({
  ...state,
  download: {
    ...state.download,
    selectedFile: file.decryptedFile,
  },
});
