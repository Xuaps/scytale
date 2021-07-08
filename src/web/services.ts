import {
  Actions,
  DecryptedFile,
  EncryptedFile,
  State,
} from "./model";
import { fileEncrypted, fileDecrypted, fileUploaded } from './events';
import { DefaultApi } from "../../gen";


export default function ({
  state,
  setState,
  docs,
  enc,
}: {
  state: State;
  setState: (state: State) => void;
  docs: DefaultApi;
  enc: {
    decryptFile: (id: string, file: Blob, password: string) => Promise<DecryptedFile>,
    encryptFile: (file: File) => Promise<EncryptedFile>}
}): Actions {
  return {
    encryptFile: async (file: File) => {
      const res = await enc.encryptFile(file);
      const doc = fileEncrypted(state, res);

      setState(doc);
    },
    decryptFile: async (id: string, file: Blob, password) => {
      const res = await enc.decryptFile(id, file, password);
      const doc = fileDecrypted(state, res);
      setState(doc);
    },
    uploadFile: async (file) => {
      const res = await docs.uploadDocuments({document: file.encryptedFile});
      const doc = fileUploaded(state, [{
        id: res.id,
        name: file.name,
        password: file.password,
      }]);
      setState(doc);
      localStorage.setItem("files", JSON.stringify(doc.upload.uploadedFiles));
    },
    downloadFile: async (id: string, password: string) => {
      const file = await docs.getDocument({id});
      const decryptedFile = await enc.decryptFile(id, file, password);
      const doc = fileDecrypted(state, decryptedFile);

      setState(doc);
    },
  };
}
