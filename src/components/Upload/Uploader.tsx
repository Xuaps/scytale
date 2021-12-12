import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";

const Uploader = ({ onAddFile }: { onAddFile: (file: File) => void }) => {
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
  });

  useEffect(() => {
    if (acceptedFiles.length === 1) {
      onAddFile(acceptedFiles[0]);
    }
  }, [acceptedFiles]);

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
      )}
    </div>
  );
};

export default Uploader;
