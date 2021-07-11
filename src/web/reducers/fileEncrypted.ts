import { FileEncrypted } from "../model";

const fileEncrypted: FileEncrypted = (state, file) => ({
  ...state,
  upload: {
    ...state.upload,
    encryptedFiles: [...state.upload.encryptedFiles, file],
  },
});

export default fileEncrypted;
