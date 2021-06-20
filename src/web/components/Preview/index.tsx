const Preview = ({ state: { selectedFile } }) => {
  return <a href={window.URL.createObjectURL(selectedFile)}>Download</a>;
};

export default Preview;
