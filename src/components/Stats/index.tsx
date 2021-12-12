import React, { useEffect } from "react";
import { SharedFile } from "../../model";
import { FileStatsState } from "../../store";

const Stats = ({ id, state, onLoad }: { id: string; state: FileStatsState; onLoad: (file: SharedFile) => void }) => {
  useEffect(() => {
    onLoad({ id, password: "" });
  }, []);

  if (!state.loaded) return <div>loading stats...</div>;

  return (
    <table>
      <thead>
        <tr>
          <th>Type</th>
          <th>Model</th>
          <th>OS</th>
          <th>IP</th>
          <th>City</th>
          <th>State or province</th>
          <th>Country or region</th>
          <th>Browser</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {state.stats.map((r) => (
          <tr key={r.timestamp}>
            <td>{r.type}</td>
            <td>{r.model}</td>
            <td>{r.os}</td>
            <td>{r.ip}</td>
            <td>{r.city}</td>
            <td>{r.stateOrProvince}</td>
            <td>{r.countryOrRegion}</td>
            <td>{r.browser}</td>
            <td>{r.timestamp}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Stats;
