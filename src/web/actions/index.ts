//commands
import { decryptFile, encryptFile } from "../workers/client";

const uploadFile = (file) => {
  const formData = new FormData();
  formData.append("document", file.encryptedFile);

  return fetch("http://localhost:3000/api/documents", {
    method: "POST",
    body: formData
  }).then((res) => res.json())
    .then((res: { id: string }) =>
      ([
        {
          id: res.id,
          name: file.name,
          password: file.password
        }
      ])
    );
};

//events
const fileEncrypted = (state, file) => ({
  ...state,
  upload: {
    ...state.upload,
    encryptedFiles: [...state.upload.encryptedFiles, file]
  }
});

const fileDecrypted = (state, file) => ({
  ...state,
  download: {
    ...state.download,
    selectedFile: file.decryptedFile
  }
});

const fileUploaded = (state, files) => {
  const nextFiles = [...state.upload.uploadedFiles, ...files];

  return {
    ...state,
    upload: {
      ...state.upload,
      uploadedFiles: nextFiles,
      encryptedFiles: []
    }
  };
};

export default function({ state, setState }) {
  return ({
    encryptFile: async (file: File) => {
      const res = await encryptFile(file);
      const doc = fileEncrypted(state, res);

      setState(doc);
    },
    decryptFile: async (file: Blob, password) => {
      const res = await decryptFile(file, password);
      const doc = fileDecrypted(state, res);
      setState(doc);
    },
    uploadFile: async (file) => {
      const res = await uploadFile(file);
      const doc = fileUploaded(state, res);
      setState(doc);
      localStorage.setItem("files", JSON.stringify(doc.upload.uploadedFiles));
    }
  });
}
