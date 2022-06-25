import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";

const Uploader = ({ onFileAdded }: { onFileAdded: (file: File) => void }) => {
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      maxFiles: 1,
      multiple: false,
    });

  useEffect(() => {
    if (acceptedFiles.length === 1) {
      onFileAdded(acceptedFiles[0]);
    }
  }, [acceptedFiles]);

  return (
    <div {...getRootProps()}>
      <input data-testid="file-selector" {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
      )}
    </div>
  );
};

export default Uploader;
