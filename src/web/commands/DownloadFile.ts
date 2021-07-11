import { DecryptedFile, EncryptedFile, DownloadFile, State, Reducers } from "../model";
import { DefaultApi } from "../../../gen";

export default function (
  state: State,
  setState: (state: State) => void,
  docs: DefaultApi,
  enc: {
    decryptFile: (
      id: string,
      file: Blob,
      password: string
    ) => Promise<DecryptedFile>;
    encryptFile: (file: File) => Promise<EncryptedFile>;
  },
  reducers: Reducers,
): DownloadFile {
  return {
    execute: async (id: string, password: string) => {
      const file = await docs.getDocument({ id });
      const decryptedFile = await enc.decryptFile(id, file, password);
      const doc = reducers.fileDecrypted(state, decryptedFile);

      setState(doc);
    }
  };
}
