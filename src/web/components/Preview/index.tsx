import { DownloadState } from "../../model";

const Preview = ({ state } : { state: DownloadState}) => {
  return <a download={state.selectedFile.name} href={window.URL.createObjectURL(state.selectedFile)}>Download</a>;
};

export default Preview;
