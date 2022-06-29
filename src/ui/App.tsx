/* eslint-disable react/no-children-prop */
import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Vault from "./Vault";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Vault />} />
      </Routes>
    </Router>
  );
};

export default App;
