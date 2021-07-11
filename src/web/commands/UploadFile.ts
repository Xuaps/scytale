import { Reducers, State, UploadFile } from "../model";
import { DefaultApi } from "../../../gen";

export default function (
  state: State,
  setState: (state: State) => void,
  docs: DefaultApi,
  reducers: Reducers,
): UploadFile {
  return {
    execute: async (file) => {
      const res = await docs.uploadDocuments({ document: file.encryptedFile });
      const doc = reducers.fileUploaded(state, [
        {
          id: res.id,
          name: file.name,
          password: file.password,
        },
      ]);
      setState(doc);
      localStorage.setItem("files", JSON.stringify(doc.upload.uploadedFiles));
    },
  };
}
