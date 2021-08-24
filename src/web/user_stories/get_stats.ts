import { map, mergeMap, Subject } from "rxjs";
import { SharedFile } from "../model";

export default {
  init: (FileStatsRequested: Subject<SharedFile>, createFileStatsDoc, getFileStats, state, setState) => {
    FileStatsRequested.pipe(
      mergeMap(async file => {
        return await getFileStats({id: file.id})
      }),
      map(stats => createFileStatsDoc(state, stats)),
    ).subscribe({
        next: doc => setState(doc),
        error: error => {}
    });
  }
}
