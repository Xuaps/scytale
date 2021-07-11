import { State, UploadedFile, UploadFile } from "../model";
import { fileUploaded } from "../events";
import { DefaultApi } from "../../../gen";

export default function (
  state: State,
  setState: (state: State) => void,
  docs: DefaultApi
): UploadFile {
  return {
    execute: async (file) => {
      const res = await docs.uploadDocuments({ document: file.encryptedFile });
      const doc = fileUploaded(state, [
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
