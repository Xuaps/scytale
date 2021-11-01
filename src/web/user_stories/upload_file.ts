import { useCallback, useEffect } from "react";
import { map, mergeMap } from "rxjs";
import { FileUploadRequested } from "../actions/events";

const useUploadFile = (createFileUploadedDoc, uploadDocuments, setState) => {
  useEffect(() => {
    FileUploadRequested.pipe(
      mergeMap(async ({ file, state }) => {
        const res = await uploadDocuments({ document: file.encryptedFile });
        return {
          file: {
            id: res.id,
            name: file.name,
            password: file.password,
          },
          state,
        };
      }),
      map(({ file, state }) => createFileUploadedDoc(state, [file]))
    ).subscribe({
      next: (doc) => {
        setState(doc);
        localStorage.setItem("files", JSON.stringify(doc.upload.uploadedFiles));
      },
      error: (error) => {
        console.log(error);
      },
    });
  }, []);

  return FileUploadRequested;
};

export default useUploadFile;
