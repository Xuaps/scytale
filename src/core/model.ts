export type EncryptedFile = {
  id: string;
  encryptedFile: File;
  name: string;
  password: string;
};
export type DecryptedFile = { name: string; decryptedFile: File };
export type UploadedFile = { id: string; password: string; name: string };
export type SharedFile = { id: string; password: string };
export type FileStats = {
  ip: string;
  model: string;
  os: string;
  type: string;
  city: string;
  stateOrProvince: string;
  countryOrRegion: string;
  browser: string;
  timestamp: string;
}[];

//commands
export type DownloadFile = {
  execute: (id: string, password: string) => Promise<void>;
};
export type EncryptFile = { execute: (file: File) => Promise<void> };
export type DecryptFile = {
  execute: (id: string, file: Blob, password: string) => void;
};
export type UploadFile = { execute: (file: EncryptedFile) => void };

//queryes
export const GetFiles = (): EncryptedFile[] => [];
