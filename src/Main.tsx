import React from "react";
import ReactDOM from "react-dom/client";
import tracer from "./tracing";
import { trace, context, SpanKind } from "@opentelemetry/api";

import "./style.css";
import { App } from "./ui";

const root_span = tracer.startSpan("Loading app", {
  attributes: {
    pageUrlwindow: window.location.href,
  },
  kind: SpanKind.CLIENT,
});
const activeContext = trace.setSpan(context.active(), root_span);
const root = ReactDOM.createRoot(document.getElementById("root"));

context.with(activeContext, () => root.render(<App />));
root_span.end();
