import { trace } from "@opentelemetry/api";
import { SimpleSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { WebTracerProvider } from "@opentelemetry/sdk-trace-web";
import { ZoneContextManager } from "@opentelemetry/context-zone";
import { HoneycombExporter } from "opentelemetry-exporter-honeycomb";

const options = {
  dataset: process.env.HONEYCOMB_DATASET,
  writeKey: process.env.HONEYCOMB_WRITE_KEY,
  serviceName: process.env.HONEYCOMB_SERVICE_NAME,
};
const exporter = new HoneycombExporter(options);
const provider = new WebTracerProvider();
provider.addSpanProcessor(new SimpleSpanProcessor(exporter));

provider.register({
  // Changing default contextManager to use ZoneContextManager - supports asynchronous operations - optional
  contextManager: new ZoneContextManager(),
});

const tracer = trace.getTracer("scytale", "1.0.0");

export default tracer;
