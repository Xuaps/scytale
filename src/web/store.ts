import { EncryptedFile, UploadedFile } from "./model";

export type UploadState = {
  encryptedFiles: EncryptedFile[];
  uploadedFiles: UploadedFile[];
}
export type DownloadState = {
  selectedFile: File | null;
}
export type State = {
  upload: UploadState,
  download: DownloadState,
}

const store : State = {
  upload: {
    encryptedFiles: [],
    uploadedFiles: JSON.parse(localStorage.getItem("files")) || [],
  },
  download: {
    selectedFile: null,
  }
}

export default store;
