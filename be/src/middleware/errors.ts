import type { ErrorRequestHandler, RequestHandler } from "express";
import { HttpError } from "../http-error.ts";

export const notFound: RequestHandler = (_req, res) => {
  res.status(404).json({ error: "Not found." });
};

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({ error: err.message });
    return;
  }

  // Errors from Express's own middleware, e.g. malformed JSON bodies (400).
  const status: unknown = err?.status;
  if (typeof status === "number" && status >= 400 && status < 500) {
    res.status(status).json({ error: "Invalid request." });
    return;
  }

  console.error(err);
  res.status(500).json({ error: "Internal server error." });
};
