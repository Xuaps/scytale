import React, { useEffect } from "react";
import { Subject } from "rxjs";
import { SharedFile } from "../../model";
import { FileStatsState } from "../../store";

const Stats = ({
  id,
  state,
  onLoad,
}: {
  id: string
  state: FileStatsState
  onLoad: Subject<SharedFile>
}) => {
  useEffect(() => {
    onLoad.next({id, password: ""})
  }, []);

  if (!state.loaded) return <div>loading stats...</div>;

  return (<div>
    {state.stats.map(f => `${f.region}&nbsp;`)}
  </div>
  );
};

export default Stats;

