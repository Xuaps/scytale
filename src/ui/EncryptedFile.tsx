import React from "react";
import { Button, Card } from "react-bootstrap";
import { EncryptedFileView } from "./mappers";
import CoverImage from "../../public/assets/encrypted.jpg";

export const EncryptedFile = ({ file }: { file: EncryptedFileView }) => (
  <Card style={{ width: "18rem" }}>
    <Card.Img variant="top" src={CoverImage} />
    <Card.Body>
      <Card.Title>{file.name}</Card.Title>
      <Card.Text>{file.password}</Card.Text>
      <Button
        href={URL.createObjectURL(file.encryptedData)}
        variant="secondary"
        as="a"
        download
      >
        Download
      </Button>
      <Button variant="primary">Share</Button>
    </Card.Body>
  </Card>
);
