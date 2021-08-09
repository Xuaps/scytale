import { map, mergeMap, Subject } from "rxjs";
import { EncryptedFile } from "../model";

export default {
  init: (FileUploadRequested: Subject<EncryptedFile>, createFileUploadedDoc, uploadDocuments, state, setState) => {
    const obs = FileUploadRequested.pipe(
      mergeMap(async file => {
        const res = await uploadDocuments({ document: file.encryptedFile });
        return {
          id: res.id,
          name: file.name,
          password: file.password
        };
      }),
      map(file => createFileUploadedDoc(state, [file]))
    );
    obs.subscribe(
      {
        next: doc => setState(doc),
        error: error => {
        }
      });
    obs.subscribe(
      { next: doc => localStorage.setItem("files", JSON.stringify(doc.upload.uploadedFiles)) }
    );
  }
};
