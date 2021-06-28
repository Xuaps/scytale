const Preview = ({ state: { selectedFile } }) => {
  return <a download={selectedFile.name} href={window.URL.createObjectURL(selectedFile)}>Download</a>;
};

export default Preview;
