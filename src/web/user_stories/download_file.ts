import { map, mergeMap, Subject } from "rxjs";
import { SharedFile } from "../model";

export default {
  init: (DownloadAFileRequested: Subject<SharedFile>, decryptFile, fileDecrypted, getDocument, state, setState) => {
    DownloadAFileRequested.pipe(
      map((a) => {console.log(a); return a;}),
      mergeMap(async file => ({
        doc: await getDocument({ id: file.id }),
        id: file.id,
        password: file.password
      })),
      mergeMap(file => decryptFile(file.id, file.doc, file.password)),
      map(decryptedFile => fileDecrypted(state, decryptedFile))
    ).subscribe(
      {
        next: doc => setState(doc),
        error: error => {
        }
      });
  }
};
