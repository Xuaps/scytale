import { useCallback } from "react";
import { map, mergeMap } from "rxjs";
import { FileUploadRequested } from "../actions/events";

const useUploadFile = (createFileUploadedDoc, uploadDocuments, state, setState) => {
  const createDoc = useCallback((file) => createFileUploadedDoc(state, file), [state]);
  FileUploadRequested.pipe(
    mergeMap(async (file) => {
      const res = await uploadDocuments({ document: file.encryptedFile });
      return {
        id: res.id,
        name: file.name,
        password: file.password,
      };
    }),
    map((file) => createDoc([file]))
  ).subscribe({
    next: (doc) => {
      setState(doc);
      localStorage.setItem("files", JSON.stringify(doc.upload.uploadedFiles));
    },
    error: (error) => {
      console.log(error);
    },
  });

  return FileUploadRequested;
};

export default useUploadFile;
