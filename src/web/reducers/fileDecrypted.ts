import { FileDecrypted } from "../model";

const fileDecrypted: FileDecrypted = (state, file) => ({
  ...state,
  download: {
    ...state.download,
    selectedFile: file.decryptedFile,
  },
});

export default fileDecrypted;
