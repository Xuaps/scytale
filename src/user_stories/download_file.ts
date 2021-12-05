import { useEffect } from "react";
import { map, mergeMap } from "rxjs";
import { DownloadAFileRequested } from "../actions/events";

const useDownloadFile = (decryptFile, createDownloadFileDoc, getDocument, setState) => {
  useEffect(() => {
    DownloadAFileRequested.pipe(
      mergeMap(async ({ file, state }) => ({
        file: {
          doc: await getDocument({ id: file.id }),
          id: file.id,
          password: file.password,
        },
        state,
      })),
      mergeMap(async ({ file, state }) => ({
        file: await decryptFile(file.id, file.doc, file.password),
        state,
      })),
      map(({ file, state }) => createDownloadFileDoc(state, file))
    ).subscribe({
      next: (doc) => setState(doc),
      error: (error) => {
        console.log(error);
      },
    });
  }, []);

  return DownloadAFileRequested;
};

export default useDownloadFile;
