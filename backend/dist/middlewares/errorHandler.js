import { APIError } from "../utils/APIError.js";
import { httpStatus } from "../utils/httpStatus.js";
export const errorHandler = (err, _req, res, _next) => {
    const statusCode = err instanceof APIError ? err.statusCode : httpStatus.INTERNAL_SERVER_ERROR;
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        ...(err instanceof APIError && err.data ? { data: err.data } : {}),
    });
};
