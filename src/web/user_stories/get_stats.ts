import { map, mergeMap } from "rxjs";
import { FileStatsRequested } from "../actions/events";

const useGetStats = (createFileStatsDoc, getFileStats, setState) => {
  FileStatsRequested.pipe(
    mergeMap(async file => {
      return await getFileStats({ id: file.id });
    }),
    map(stats => createFileStatsDoc(stats))
  ).subscribe({
    next: doc => setState(doc),
    error: error => {
      console.log(error)
    }
  });

  return FileStatsRequested;
};

export default useGetStats;
