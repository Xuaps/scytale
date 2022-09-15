import {
  SimpleSpanProcessor,
  ConsoleSpanExporter,
} from "@opentelemetry/sdk-trace-base";
import { WebTracerProvider } from "@opentelemetry/sdk-trace-web";
import { ZoneContextManager } from "@opentelemetry/context-zone";
import { HoneycombExporter } from "opentelemetry-exporter-honeycomb";

const options = {
  dataset: "browser",
  writeKey: "faz0vMyOmZX8SYd76V2E3E",
  serviceName: "scytale",
};
const exporter = new HoneycombExporter(options);
const provider = new WebTracerProvider();
provider.addSpanProcessor(new SimpleSpanProcessor(exporter));

provider.register({
  // Changing default contextManager to use ZoneContextManager - supports asynchronous operations - optional
  contextManager: new ZoneContextManager(),
});
