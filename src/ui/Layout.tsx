import React from "react";
import PropTypes from "prop-types";
import { Container } from "react-bootstrap";

const Layout = ({ children }: { children: JSX.Element[] }) => {
  return <Container style={{ marginTop: 20 }}>{children}</Container>;
};

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Layout;
