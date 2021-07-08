import React, { useEffect } from "react";
import { Actions, DownloadState } from "../../model";

const Download = ({
  id,
  password,
  state,
  actions,
}: {
  id: string;
  password: string;
  state: DownloadState;
  actions: Actions;
}) => {
  useEffect(() => {
    actions.downloadFile(id, password);
  }, []);

  if (!state.selectedFile) return <div>Decrypting file...</div>;

  return (
    <a
      download={state.selectedFile.name}
      href={window.URL.createObjectURL(state.selectedFile)}
    >
      Download
    </a>
  );
};

export default Download;
