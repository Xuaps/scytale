import React from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import { DecryptedFileView } from "./mappers";
import CoverImage from "../../public/assets/encrypted.jpg";

export const DecryptedFile = ({ file }: { file: DecryptedFileView }) => {
  return (
    <Card>
      <Card.Img variant="top" src={CoverImage} />
      <Card.Body>
        <Card.Title>{file.name}</Card.Title>
        <Row>
          <Col>
            <Button
              href={URL.createObjectURL(file.decryptedData)}
              variant="secondary"
              as="a"
              style={{ width: "100%" }}
              download={`${file.name}`}
            >
              Download
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
