import { DecryptedFile, EncryptedFile, State, UploadedFile } from "./model";

export const fileEncrypted = (state: State, file: EncryptedFile): State => ({
  ...state,
  upload: {
    ...state.upload,
    encryptedFiles: [...state.upload.encryptedFiles, file],
  },
});

export const fileDecrypted = (state: State, file: DecryptedFile): State => ({
  ...state,
  download: {
    ...state.download,
    selectedFile: file.decryptedFile,
  },
});

export const fileUploaded = (state: State, files: UploadedFile[]): State => {
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
