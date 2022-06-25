/* eslint-disable react/no-children-prop */
import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Upload } from "./components";

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
