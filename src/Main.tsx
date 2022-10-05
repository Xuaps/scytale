import React from "react";
import ReactDOM from "react-dom/client";
import { tracer, withContext, SpanKind } from "./tracing";

import "./style.css";
import { App } from "./ui";

const span = tracer.startSpan("Loading app", {
  kind: SpanKind.CLIENT,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
withContext(span, root.render, root, <App />);

span.end();
