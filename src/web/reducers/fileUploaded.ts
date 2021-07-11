import { FileUploaded } from "../model";

const fileUploaded: FileUploaded = (state, files) => {
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

export default fileUploaded;
