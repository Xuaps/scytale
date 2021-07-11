import React, { useEffect } from "react";
import { DownloadFile, DownloadState } from "../../model";

const Download = ({
  id,
  password,
  state,
  downloadFile,
}: {
  id: string;
  password: string;
  state: DownloadState;
  downloadFile: DownloadFile;
}) => {
  useEffect(() => {
    downloadFile.execute(id, password).then();
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
