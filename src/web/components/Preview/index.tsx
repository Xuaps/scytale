const Preview = ({ file }: { file: Blob }) => {
  return <a href={window.URL.createObjectURL(file)}>Download</a>;
};

export default Preview;
