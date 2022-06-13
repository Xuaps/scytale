import { useEffect } from "react";
import { map, mergeMap } from "rxjs";
import { DeleteDocumentRequest } from "../actions/commands";
import { FileDeleted } from "../actions/documents";
import { FileDeletionRequested } from "../actions/events";
import { State } from "../store";

const useDeleteFile = (
  createDeleteFileDoc: FileDeleted,
  deleteFile: (requestParameters: DeleteDocumentRequest) => Promise<void>,
  setState: (store: State) => void
) => {
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
