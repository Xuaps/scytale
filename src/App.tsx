/* eslint-disable react/no-children-prop */
import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Upload } from "./components";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Upload />} />
      </Routes>
    </Router>
  );
};

export default App;
