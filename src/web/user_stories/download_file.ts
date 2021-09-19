import { map, mergeMap } from "rxjs";
import { DownloadAFileRequested } from "../actions/events";

const useDownloadFile = (decryptFile, fileDecrypted, getDocument, setState) => {
  DownloadAFileRequested.pipe(
    mergeMap(async file => ({
      doc: await getDocument({ id: file.id }),
      id: file.id,
      password: file.password
    })),
    mergeMap(file => decryptFile(file.id, file.doc, file.password)),
    map(decryptedFile => fileDecrypted(decryptedFile))
  ).subscribe(
    {
      next: doc => setState(doc),
      error: error => {
        console.log(error)
      }
    });

  return DownloadAFileRequested;
};

export default useDownloadFile;
