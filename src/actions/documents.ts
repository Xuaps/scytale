import {
  DecryptedFile,
  EncryptedFile,
  SharedFile,
  UploadedFile,
  FileStats,
} from "../model";
import { State } from "../store";

export type FileUploaded = (state: State, files: UploadedFile[]) => State;
export type FileDeleted = (state: State, file: SharedFile) => State;
export type FileEncrypted = (
  files: EncryptedFile[],
  file: EncryptedFile
) => EncryptedFile[];
export type FileDecrypted = (state: State, file: DecryptedFile) => State;
export type FileStatsRecovered = (state: State, stats: FileStats) => State;

export const createFileEncryptedDoc: FileEncrypted = (files, file) => {
  console.log("tachan");
  return [...files, file];
};

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

export const createDeleteFileDoc: FileDeleted = (state, file: SharedFile) => {
  const nextFiles = [
    ...state.upload.uploadedFiles.filter((f) => f.id !== file.id),
  ];

  return {
    ...state,
    upload: {
      ...state.upload,
      uploadedFiles: nextFiles,
      encryptedFiles: [],
    },
  };
};

export const createDownloadFileDoc: FileDecrypted = (state, file) => ({
  ...state,
  download: {
    ...state.download,
    selectedFile: file.decryptedFile,
  },
});

export const createFileStatsDoc: FileStatsRecovered = (state, stats) => ({
  ...state,
  file_stats: {
    loaded: true,
    stats,
  },
});
