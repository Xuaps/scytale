import React from "react";
import PropTypes from "prop-types";

const Layout = ({ children }: { children: JSX.Element[] }) => {
  return <div>{children}</div>;
};

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Layout;
