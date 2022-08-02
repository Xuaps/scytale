import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

export const Password = ({
  onPassword,
}: {
  onPassword: (password: string) => void;
}) => {
  const [password, setPassword] = useState("");
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" onClick={() => onPassword(password)}>
        Submit
      </Button>
    </Form>
  );
};
