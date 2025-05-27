"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIResponse = void 0;
class APIResponse {
    constructor(statusCode, data, message = "Success") {
        this.success = statusCode < 400;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}
exports.APIResponse = APIResponse;
