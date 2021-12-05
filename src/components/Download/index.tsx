import React, { useEffect } from "react";
import { SharedFile } from "../../model";
import { DownloadState } from "../../store";

const Download = ({
  id,
  password,
  state,
  onRender,
}: {
  id: string;
  password: string;
  state: DownloadState;
  onRender: (file: SharedFile ) => void;
}) => {
  useEffect(() => {
    onRender({id, password: decodeURIComponent(password)})
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
