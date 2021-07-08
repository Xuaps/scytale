//commands
import { decryptFile, encryptFile } from "../workers/client";
import { Actions, DecryptedFile, DownloadState, EncryptedFile, State, UploadedFile } from "../model";

const downloadFile = async (id: string): Promise<Blob> => {
  return fetch(`http://localhost:3000/api/documents/${id}`)
    .then(response => response.blob());
};

const uploadFile = (file: EncryptedFile): Promise<[UploadedFile]> => {
  const formData = new FormData();
  formData.append("document", file.encryptedFile);

  return fetch("http://localhost:3000/api/documents", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((res: { id: string }) => [
      {
        id: res.id,
        name: file.name,
        password: file.password,
      },
    ]);
};

//events
const fileEncrypted = (state: State, file: EncryptedFile): State => ({
  ...state,
  upload: {
    ...state.upload,
    encryptedFiles: [...state.upload.encryptedFiles, file],
  },
});

const fileDecrypted = (state: State, file: DecryptedFile): State => ({
  ...state,
  download: {
    ...state.download,
    selectedFile: file.decryptedFile,
  },
});

const fileUploaded = (state: State, files: UploadedFile[]): State => {
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

export default function ({
  state,
  setState,
}: {
  state: State;
  setState: (state: State) => void;
}): Actions {
  return {
    encryptFile: async (file: File) => {
      const res = await encryptFile(file);
      const doc = fileEncrypted(state, res);

      setState(doc);
    },
    decryptFile: async (id: string, file: Blob, password) => {
      const res = await decryptFile(id, file, password);
      const doc = fileDecrypted(state, res);
      setState(doc);
    },
    uploadFile: async (file) => {
      const res = await uploadFile(file);
      const doc = fileUploaded(state, res);
      setState(doc);
      localStorage.setItem("files", JSON.stringify(doc.upload.uploadedFiles));
    },
    downloadFile: async (id: string, password: string) => {
      const file = await downloadFile(id);
      const decryptedFile = await decryptFile(id, file, password);
      const doc = fileDecrypted(state, decryptedFile)

      setState(doc)
    },
  };
}
