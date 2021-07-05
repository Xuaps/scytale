import { State } from "./model";

const initialState : State = {
  upload: {
    encryptedFiles: [],
    uploadedFiles: JSON.parse(localStorage.getItem("files")) || [],
  },
  download: {
    selectedFile: null,
  }
}

export default initialState;
