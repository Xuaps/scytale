import { DecryptedFile, DecryptFile, EncryptedFile, State } from "../model";
import { fileDecrypted } from "../events";

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
  }
): DecryptFile {
  return {
    execute: async (id: string, file: Blob, password) => {
      const res = await enc.decryptFile(id, file, password);
      const doc = fileDecrypted(state, res);
      setState(doc);
    },
  };
}
