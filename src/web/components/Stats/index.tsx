import React, { useEffect } from "react";
import { SharedFile } from "../../model";
import { FileStatsState } from "../../store";

const Stats = ({
  id,
  state,
  onLoad,
}: {
  id: string
  state: FileStatsState
  onLoad: (file: SharedFile) => void
}) => {
  useEffect(() => {
    onLoad({id, password: ""})
  }, []);

  if (!state.loaded) return <div>loading stats...</div>;

  return (<div>
    {state.stats.map(f => `
      ${f.type}&nbsp;
      ${f.model}&nbsp;
      ${f.os}&nbsp;
      ${f.ip}&nbsp;
      ${f.city}&nbsp;
      ${f.stateOrProvince}&nbsp;
      ${f.countryOrRegion}&nbsp;
      ${f.browser}&nbsp;
      ${f.timestamp}&nbsp;
    `)}
  </div>
  );
};

export default Stats;

