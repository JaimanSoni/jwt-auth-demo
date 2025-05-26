import { APIError } from "../utils/APIError";
import { Request, Response, NextFunction } from "express";
import { httpStatus } from "../utils/httpStatus";

export const errorHandler = (
  err: Error | APIError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode =
    err instanceof APIError ? err.statusCode : httpStatus.INTERNAL_SERVER_ERROR;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(err instanceof APIError && err.data ? { data: err.data } : {}),
  });
};