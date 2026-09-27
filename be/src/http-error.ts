// Throw from a handler to send an error response with this status and message.
// Express 5 forwards errors from async handlers to the error middleware.
export class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}
