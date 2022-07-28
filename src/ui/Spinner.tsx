import React from "react";
import { Spinner as BootstrapSpinner } from "react-bootstrap";

export const Spinner = ({ onLoad }: { onLoad: () => void }) => (
  <>
    <img
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
      onLoad={onLoad}
    />
    <BootstrapSpinner
      data-testid="spinner"
      style={{ width: "20rem", height: "20rem" }}
      animation="grow"
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </BootstrapSpinner>
  </>
);
