import {
  SimpleSpanProcessor,
  ConsoleSpanExporter,
} from "@opentelemetry/sdk-trace-base";
import { WebTracerProvider } from "@opentelemetry/sdk-trace-web";
import { ZoneContextManager } from "@opentelemetry/context-zone";
import { trace, context, SpanKind } from "@opentelemetry/api";

const tracer = trace.getTracer("scytale", "0.1.0");
const exporter = new ConsoleSpanExporter();
const provider = new WebTracerProvider();
provider.addSpanProcessor(new SimpleSpanProcessor(exporter));

provider.register({
  // Changing default contextManager to use ZoneContextManager - supports asynchronous operations - optional
  contextManager: new ZoneContextManager(),
});

function withContext(span, fn, thisArg, ...args) {
  const ctx = trace.setSpan(context.active(), span);
  context.with(ctx, fn, thisArg, args);
}

export { tracer, SpanKind, withContext };
