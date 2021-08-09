import React, { useEffect } from "react";
import { SharedFile } from "../../model";
import { Subject } from "rxjs";
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
  onRender: Subject<SharedFile>;
}) => {
  useEffect(() => {
    onRender.next({id, password})
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
