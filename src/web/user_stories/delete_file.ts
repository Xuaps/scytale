import { map, mergeMap } from "rxjs";
import { FileDeletionRequested } from "../actions/events";

const useDeleteFile = (createDeleteFileDoc, deleteFile, setState) => {
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
    map(file => createDeleteFileDoc(file))
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
