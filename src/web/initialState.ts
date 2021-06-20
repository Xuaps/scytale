import { EncryptedFile, UploadedFile } from "./model";

const initialState  : {
  upload: {
    encryptedFiles: EncryptedFile[];
    uploadedFiles: UploadedFile[];
  },
  download: {
    selectedFile: File | null;
  }
} = {
  upload: {
    encryptedFiles: [],
    uploadedFiles: JSON.parse(localStorage.getItem("files")) || [],
  },
  download: {
    selectedFile: null,
  }
}

export default initialState;
