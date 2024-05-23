const { logs } = require("@opentelemetry/api-logs");
const { LoggerProvider, BatchLogRecordProcessor } = require("@opentelemetry/sdk-logs");
const { AzureMonitorLogExporter } = require("@azure/monitor-opentelemetry-exporter");

// Add the Log exporter into the logRecordProcessor and register it with the LoggerProvider
const exporter = new AzureMonitorLogExporter({
  connectionString:
    "InstrumentationKey=775bf917-c707-4eff-a34e-aac0c0b57752;IngestionEndpoint=https://uksouth-1.in.applicationinsights.azure.com/;LiveEndpoint=https://uksouth.livediagnostics.monitor.azure.com/;ApplicationId=a65cdefe-04e5-4a00-a160-8dbb83f612fb",
});

const { metrics, trace } = require("@opentelemetry/api");
const { registerInstrumentations } = require("@opentelemetry/instrumentation");
const { ExpressInstrumentation } = require("@opentelemetry/instrumentation-express");
const { useAzureMonitor } = require( "@azure/monitor-opentelemetry");

const options = {
  azureMonitorExporterOptions: {
    connectionString:
      "InstrumentationKey=775bf917-c707-4eff-a34e-aac0c0b57752;IngestionEndpoint=https://uksouth-1.in.applicationinsights.azure.com/;LiveEndpoint=https://uksouth.livediagnostics.monitor.azure.com/;ApplicationId=a65cdefe-04e5-4a00-a160-8dbb83f612fb",
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