import { map, mergeMap, Subject } from "rxjs";
import { SharedFile } from "../model";

export default {
  init: (FileDeletionRequested: Subject<SharedFile>, createDeleteFileDoc, deleteFile, state, setState) => {
    const obs = FileDeletionRequested.pipe(
      mergeMap(async file => {
        await deleteFile({id: file.id})
        return file
      }),
      map(file => createDeleteFileDoc(state, file)),
    )
    
    obs.subscribe({
        next: doc => setState(doc),
        error: error => {}
    });

    obs.subscribe(
      { next: doc => localStorage.setItem("files", JSON.stringify(doc.upload.uploadedFiles)) }
    );
  }
}

