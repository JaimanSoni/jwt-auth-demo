"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const APIError_1 = require("../utils/APIError");
const httpStatus_1 = require("../utils/httpStatus");
const errorHandler = (err, _req, res, _next) => {
    const statusCode = err instanceof APIError_1.APIError ? err.statusCode : httpStatus_1.httpStatus.INTERNAL_SERVER_ERROR;
    res.status(statusCode).json(Object.assign({ success: false, message: err.message || "Internal Server Error" }, (err instanceof APIError_1.APIError && err.data ? { data: err.data } : {})));
};
exports.errorHandler = errorHandler;
