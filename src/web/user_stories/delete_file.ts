import { useEffect } from "react";
import { map, mergeMap } from "rxjs";
import { FileDeletionRequested } from "../actions/events";

const useDeleteFile = (createDeleteFileDoc, deleteFile, setState) => {
  useEffect(() => {
    FileDeletionRequested.pipe(
      mergeMap(async ({ file, state }) => {
        try {
          await deleteFile({ id: file.id });
        } catch (err) {
          if (err.status === 404) return { file, state };
          throw err;
        }
        return { file, state };
      }),
      map(({ file, state }) => createDeleteFileDoc(state, file))
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

  return FileDeletionRequested;
};

export default useDeleteFile;
