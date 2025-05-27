"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIError = void 0;
class APIError extends Error {
    constructor(statusCode, message, data = null, stack = "") {
        super(message);
        this.statusCode = statusCode;
        this.data = data;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.APIError = APIError;
