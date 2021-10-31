import { useCallback } from "react";
import { map, mergeMap } from "rxjs";
import { FileDeletionRequested } from "../actions/events";

const useDeleteFile = (createDeleteFileDoc, deleteFile, state, setState) => {
  const deleteDoc = useCallback((file) => createDeleteFileDoc(state, file), [state])

  FileDeletionRequested.pipe(
    mergeMap(async file => {
      try {
        await deleteFile({ id: file.id });
      } catch (err) {
        if (err.status === 404) return file;
        throw err;
      }
      return file;
    }),
    map(file => deleteDoc(file))
  ).subscribe({
    next: doc => {
      setState(doc);
      localStorage.setItem("files", JSON.stringify(doc.upload.uploadedFiles));
    },
    error: error => {
      console.log(error);
    }
  });

  return FileDeletionRequested;
};

export default useDeleteFile;
