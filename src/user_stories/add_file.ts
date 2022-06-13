import { useEffect } from "react";
import { map, mergeMap } from "rxjs";
import { FileEncrypted } from "../actions/documents";
import { FileAdded } from "../actions/events";
import { State } from "../store";

const useAddFile = (
  encryptFile: (
    file: File
  ) => Promise<{
    id: string;
    encryptedFile: File;
    name: string;
    password: string;
  }>,
  createFileEncryptedDoc: FileEncrypted,
  setState: (store: State) => void
) => {
  useEffect(() => {
    FileAdded.pipe(
      mergeMap(async ({ file, state }) => ({
        file: await encryptFile(file),
        state,
      })),
      map(({ file, state }) => createFileEncryptedDoc(state, file))
    ).subscribe({
      next: (doc) => setState(doc),
      error: (error) => {
        console.log(error);
      },
    });
  }, []);

  return FileAdded;
};

export default useAddFile;
