import { useEffect } from "react";
import { map, mergeMap } from "rxjs";
import {
  GetDocumentStatsRequest,
  InlineResponse200,
} from "../actions/commands";
import { FileStatsRecovered } from "../actions/documents";
import { FileStatsRequested } from "../actions/events";
import { FileStats } from "../model";
import { State } from "../store";

const useGetStats = (
  createFileStatsDoc: FileStatsRecovered,
  getFileStats: (
    request: GetDocumentStatsRequest
  ) => Promise<InlineResponse200>,
  setState: (store: State) => void
) => {
  useEffect(() => {
    FileStatsRequested.pipe(
      mergeMap(async ({ file, state }) => {
        return {
          stats: (await getFileStats({ id: file.id })).value.map(
            (v) => v.client
          ) as FileStats,
          state,
        };
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
