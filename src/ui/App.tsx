/* eslint-disable react/no-children-prop */
import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Vault from "./Vault";
import { trace, context } from "@opentelemetry/api";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const tracer = trace.getTracer("scytale", "1.0.0");
const root_span = tracer.startSpan("document_load");
//start span when navigating to page
root_span.setAttribute("pageUrlwindow", window.location.href);
const activeContext = trace.setSpan(context.active(), root_span);

root_span.end();
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Vault activeContext={activeContext} />} />
      </Routes>
    </Router>
  );
};

export default App;
