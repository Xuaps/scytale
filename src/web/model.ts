import { fileDecrypted } from "./reducers";

export type EncryptedFile = { id: string, encryptedFile: File; name: string; password: string }
export type DecryptedFile = { name: string, decryptedFile: File; }
export type UploadedFile = { id: string; password: string, name: string }
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

//commands
export type DownloadFile = { execute: (id: string, password: string) => Promise<void> };
export type EncryptFile = { execute: (file: File) => Promise<void> };
export type DecryptFile = { execute: (id: string, file: Blob, password: string) => void };
export type UploadFile = { execute: (file: EncryptedFile) => void };

//reducers
export type FileUploaded = (state: State, files: UploadedFile[]) => State;
export type FileEncrypted = (state: State, file: EncryptedFile) => State;
export type FileDecrypted = (state: State, file: DecryptedFile) => State;

export type Reducers = { fileUploaded: FileUploaded, fileEncrypted: FileEncrypted, fileDecrypted: FileDecrypted }

