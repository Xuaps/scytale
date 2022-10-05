import React from "react";
import ReactDOM from "react-dom/client";
import tracer from "./tracing";

import "./style.css";
import { App } from "./ui";

const span = tracer.startSpan("Loading app");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

span.end();
