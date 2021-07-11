import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { EncryptFile } from "../../model";

const Uploader = ({ onAddFile }: { onAddFile: EncryptFile }) => {
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    maxFiles: 1,
  });

  useEffect(() => {
    if(acceptedFiles.length === 1) {
      onAddFile.execute(acceptedFiles[0]);
    }
  }, [acceptedFiles])

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};

export default Uploader;
