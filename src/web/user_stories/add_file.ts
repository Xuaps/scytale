import { map, mergeMap } from "rxjs";
import { FileAdded } from "../actions/events";

const useAddFile = (encryptFile, createFileEncryptedDoc, setState) => {
  FileAdded.pipe(
    mergeMap(file => encryptFile(file)),
    map(file => createFileEncryptedDoc(file))
  ).subscribe(
    {
      next: doc => setState(doc),
      error: error => {
        console.log(error)
      }
    });

  return FileAdded;
};

export default useAddFile
