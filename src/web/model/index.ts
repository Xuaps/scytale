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
export interface State {
  upload: UploadState,
  download: DownloadState,
}
export interface Actions {
  encryptFile: (file: File) => void;
  decryptFile: (id: string, file: Blob, password: string) => void;
  uploadFile: (file: EncryptedFile) => void;
}

