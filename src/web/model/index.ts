export type EncryptedFile = { id: string, encryptedFile: File; name: string; password: string }
export type DecryptedFile = { name: string, decryptedFile: File; }
export type UploadedFile = { id: string; password: string, name: string }
