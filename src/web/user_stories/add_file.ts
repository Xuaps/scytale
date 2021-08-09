import { map, mergeMap } from "rxjs";

export default {
  init: (FileAdded, encryptFile, createFileEncryptedDoc, state, setState) => {
    FileAdded.pipe(
      mergeMap(file => encryptFile(file)),
      map(file => createFileEncryptedDoc(state, file)),
    ).subscribe(
      {
        next: doc => setState(doc),
        error: error => {
        }
      })
  }
}
