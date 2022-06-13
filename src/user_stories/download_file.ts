import { useEffect } from "react";
import { map, mergeMap } from "rxjs";
import { GetDocumentRequest } from "../actions/commands";
import { FileDecrypted } from "../actions/documents";
import { DownloadAFileRequested } from "../actions/events";
import { State } from "../store";

const useDownloadFile = (
  decryptFile: (
    id: string,
    file: File,
    password: string
  ) => Promise<{ name: string; decryptedFile: File }>,
  createDownloadFileDoc: FileDecrypted,
  getDocument: (requestParameters: GetDocumentRequest) => Promise<Blob>,
  setState: (store: State) => void
) => {
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
        file: await decryptFile(
          file.id,
          new File([file.doc], file.id),
          file.password
        ),
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
