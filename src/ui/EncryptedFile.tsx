import React from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import { EncryptedFileView } from "./mappers";
import CoverImage from "../../public/assets/encrypted.jpg";

export const EncryptedFile = ({ file }: { file: EncryptedFileView }) => {
  const [show, setShow] = React.useState(false);

  return (
    <Card>
      <Card.Img variant="top" src={CoverImage} />
      <Card.Body>
        <Card.Title>{file.name}</Card.Title>
        <Card.Text>
          <Row>
            <Col>Password:</Col>
            <Col>
              <code>
                {show
                  ? file.password
                  : Array(file.password.length).fill("*").join("")}
              </code>
            </Col>
            <Col>
              <a
                onClick={() => setShow(!show)}
                className={`bi bi-eye${!show ? "" : "-slash"}`}
              ></a>
            </Col>
          </Row>
        </Card.Text>
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
};
