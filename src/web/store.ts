import { State } from "./model";

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
