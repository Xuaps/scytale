import React from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import { EncryptedFileView } from "./mappers";
import CoverImage from "../../public/assets/encrypted.jpg";

export const EncryptedFile = ({ file }: { file: EncryptedFileView }) => (
  <Card>
    <Card.Img variant="top" src={CoverImage} />
    <Card.Body>
      <Card.Title>{file.name}</Card.Title>
      <Card.Text>{file.password}</Card.Text>
      <Row>
        <Col>
          <Button
            href={URL.createObjectURL(file.encryptedData)}
            variant="secondary"
            as="a"
            style={{ width: "100%" }}
            download
          >
            Download
          </Button>
        </Col>
        <Col>
          <Button style={{ width: "100%" }} variant="primary" disabled>
            Share
          </Button>
        </Col>
      </Row>
    </Card.Body>
  </Card>
);
