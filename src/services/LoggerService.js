// import * as Sentry from "@sentry/react";
// import { Integrations } from "@sentry/tracing";

function init() {
  // Sentry.init({
  //   dsn:
  //     "https://3d11430064924c56ba9060861afef4ff@o462812.ingest.sentry.io/5466736",
  //   integrations: [new Integrations.BrowserTracing()],
  //   // We recommend adjusting this value in production, or using tracesSampler
  //   // for finer control
  //   tracesSampleRate: 1.0,
  // });
}

function log(error) {
  // Sentry.captureException(error);
  console.log(error);
}

export default {
  init,
  log,
};
