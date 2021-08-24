import { EncryptedFile, FileStats, UploadedFile } from "./model";

export type UploadState = {
  encryptedFiles: EncryptedFile[];
  uploadedFiles: UploadedFile[];
}
export type DownloadState = {
  selectedFile: File | null;
}
export type FileStatsState = {
  loaded: boolean
  stats: FileStats
}

export type State = {
  upload: UploadState,
  download: DownloadState,
  file_stats: FileStatsState,
}

const store : State = {
  upload: {
    encryptedFiles: [],
    uploadedFiles: JSON.parse(localStorage.getItem("files")) || [],
  },
  download: {
    selectedFile: null,
  },
  file_stats: { loaded: false, stats: [] },
}

export default store;
