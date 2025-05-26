import { httpStatus } from "./httpStatus";

interface APIErrorType extends Error {
  statusCode: number;
  data: any;
}

export class APIError extends Error implements APIErrorType {
  statusCode: number;
  data: any;
  constructor(statusCode: number, message: string, data = null, stack = "") {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
