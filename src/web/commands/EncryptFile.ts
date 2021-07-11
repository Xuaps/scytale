import { DecryptedFile, EncryptedFile, State } from "../model";
import { fileEncrypted } from "../events";
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
  }
): EncryptFile {
  return {
    execute: async (file: File) => {
      const res = await enc.encryptFile(file);
      const doc = fileEncrypted(state, res);

      setState(doc);
    },
  };
}
