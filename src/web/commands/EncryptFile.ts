import { DecryptedFile, EncryptedFile, Reducers, State } from "../model";
import { EncryptFile } from "../model";

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
): EncryptFile {
  return {
    execute: async (file: File) => {
      const res = await enc.encryptFile(file);
      const doc = reducers.fileEncrypted(state, res);

      setState(doc);
    },
  };
}
