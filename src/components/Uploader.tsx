import React, { useEffect } from "react";
import { Card, Placeholder } from "react-bootstrap";
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
    <>
      <input data-testid="file-selector" {...getInputProps()} />
      <Card {...getRootProps()}>
        <Card.Body>
          <Card.Title>Encrypt a file</Card.Title>
          <Card.Text>
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>
                Drag &apos;n&apos; drop some files here, or click to select
                files
              </p>
            )}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default Uploader;
