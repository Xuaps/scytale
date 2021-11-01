import { useCallback, useEffect } from "react";
import { map, mergeMap } from "rxjs";
import { FileStatsRequested } from "../actions/events";

const useGetStats = (createFileStatsDoc, getFileStats, setState) => {
  useEffect(() => {
    FileStatsRequested.pipe(
      mergeMap(async ({ file, state }) => {
        return { stats: await getFileStats({ id: file.id }), state };
      }),
      map(({ stats, state }) => createFileStatsDoc(state, stats))
    ).subscribe({
      next: (doc) => setState(doc),
      error: (error) => {
        console.log(error);
      },
    });
  }, []);

  return FileStatsRequested;
};

export default useGetStats;
