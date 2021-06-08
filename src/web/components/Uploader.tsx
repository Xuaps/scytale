import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const Uploader = ({onAddFiles}: {onAddFiles: (files: File[]) => any}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: onAddFiles });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
};

export default Uploader;
