import { useCallback } from "react";
import { map, mergeMap } from "rxjs";
import { FileStatsRequested } from "../actions/events";

const useGetStats = (createFileStatsDoc, getFileStats, state, setState) => {
  const createDoc = useCallback((stats) => createFileStatsDoc(state, stats), [state]);

  FileStatsRequested.pipe(
    mergeMap(async (file) => {
      return await getFileStats({ id: file.id });
    }),
    map((stats) => createDoc(stats))
  ).subscribe({
    next: (doc) => setState(doc),
    error: (error) => {
      console.log(error);
    },
  });

  return FileStatsRequested;
};

export default useGetStats;
