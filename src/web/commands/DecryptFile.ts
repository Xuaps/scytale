import { DecryptedFile, DecryptFile, EncryptedFile, Reducers, State } from "../model";

export default function (
  state: State,
  setState: (state: State) => void,
  enc: {
    decryptFile: (
      id: string,
      file: Blob,
      password: string
    ) => Promise<DecryptedFile>;
    encryptFile: (file: File) => Promise<EncryptedFile>;
  },
  reducers: Reducers,
): DecryptFile {
  return {
    execute: async (id: string, file: Blob, password) => {
      const res = await enc.decryptFile(id, file, password);
      const doc = reducers.fileDecrypted(state, res);
      setState(doc);
    },
  };
}
