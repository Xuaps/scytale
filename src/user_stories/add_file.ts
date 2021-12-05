import { useEffect } from "react";
import { map, mergeMap } from "rxjs";
import { FileAdded } from "../actions/events";

const useAddFile = (encryptFile, createFileEncryptedDoc, setState) => {
  useEffect(() => {
    FileAdded.pipe(
      mergeMap(async ({ file, state }) => ({ file: await encryptFile(file), state })),
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
