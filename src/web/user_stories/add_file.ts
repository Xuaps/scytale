import { useCallback } from "react";
import { map, mergeMap } from "rxjs";
import { FileAdded } from "../actions/events";

const useAddFile = (encryptFile, createFileEncryptedDoc, state, setState) => {
  const createDoc = useCallback((file) => createFileEncryptedDoc(state, file), [
    state,
  ]);
  FileAdded.pipe(
    mergeMap((file) => encryptFile(file)),
    map((file) => createDoc(file))
  ).subscribe({
    next: (doc) => setState(doc),
    error: (error) => {
      console.log(error);
    },
  });

  return FileAdded;
};

export default useAddFile;
