const { logs } = require("@opentelemetry/api-logs");
const { LoggerProvider, BatchLogRecordProcessor } = require("@opentelemetry/sdk-logs");
const { AzureMonitorLogExporter } = require("@azure/monitor-opentelemetry-exporter");

// Add the Log exporter into the logRecordProcessor and register it with the LoggerProvider
const exporter = new AzureMonitorLogExporter({
  connectionString:
    process.env["APPLICATIONINSIGHTS_CONNECTION_STRING"] ,
});

const { metrics, trace } = require("@opentelemetry/api");
const { registerInstrumentations } = require("@opentelemetry/instrumentation");
const { ExpressInstrumentation } = require("@opentelemetry/instrumentation-express");
const { useAzureMonitor } = require( "@azure/monitor-opentelemetry");

const options = {
  azureMonitorExporterOptions: {
    connectionString:
      process.env["APPLICATIONINSIGHTS_CONNECTION_STRING"] || "<your connection string>",
  },
}
useAzureMonitor(options);
const instrumentations = [
  new ExpressInstrumentation(),
];
registerInstrumentations({
  tracerProvider: trace.getTracerProvider(),
  meterProvider: metrics.getMeterProvider(),
  instrumentations: instrumentations,
});  