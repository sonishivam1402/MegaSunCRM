import morgan from "morgan";
import logger from "../utils/logger.js";

morgan.token("user", (req) => req?.user?.id || null);
morgan.token("id", (req) => req.id);
morgan.token("body", (req) =>
  Object.keys(req.body || {}).length ? req.body : null
);
morgan.token("params", (req) =>
  Object.keys(req.params || {}).length ? req.params : null
);
morgan.token("query", (req) =>
  Object.keys(req.query || {}).length ? req.query : null
);

const requestLogger = morgan((tokens, req, res) => {
  const status = Number(tokens.status(req, res));

  const logObject = {
    message: "Incoming Request",
    requestId: tokens.id(req, res),
    method: tokens.method(req, res),
    route: tokens.url(req, res),
    status,
    responseTime: `${tokens["response-time"](req, res)} ms`,
    user: tokens.user(req, res),
    body: tokens.body(req, res),
    params: tokens.params(req, res),
    query: tokens.query(req, res),
    source: "request",
  };

  if (status >= 500) {
    logger.error(logObject);
  } else if (status >= 400) {
    logger.warn(logObject);
  } else {
    logger.info(logObject);
  }

  return null;
});

export default requestLogger;
