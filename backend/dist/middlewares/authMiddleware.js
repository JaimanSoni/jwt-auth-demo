"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const APIError_1 = require("../utils/APIError");
const httpStatus_1 = require("../utils/httpStatus");
const user_model_1 = require("../models/user.model");
const tokenUtils_1 = require("../utils/tokenUtils");
const checkAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith("Bearer "))) {
        throw new APIError_1.APIError(httpStatus_1.httpStatus.UNAUTHORIZED, "Authorization token missing");
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = (0, tokenUtils_1.verifyAccessToken)(token);
        if (!(decoded === null || decoded === void 0 ? void 0 : decoded.userId)) {
            throw new APIError_1.APIError(httpStatus_1.httpStatus.UNAUTHORIZED, "Invalid token payload");
        }
        const user = yield user_model_1.User.findById(decoded.userId).select("-password -refresh_token");
        if (!user) {
            throw new APIError_1.APIError(httpStatus_1.httpStatus.UNAUTHORIZED, "User not found");
        }
        req.user = user;
        next();
    }
    catch (err) {
        throw new APIError_1.APIError(httpStatus_1.httpStatus.UNAUTHORIZED, err.message || "Invalid access token");
    }
});
exports.checkAuth = checkAuth;
