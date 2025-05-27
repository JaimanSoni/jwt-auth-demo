"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccessToken = exports.verifyRefreshToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const dotenv_1 = require("dotenv");
const jsonwebtoken_1 = require("jsonwebtoken");
const APIError_1 = require("./APIError");
const httpStatus_1 = require("./httpStatus");
(0, dotenv_1.config)();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
    throw new Error("ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET must be defined");
}
function getExpiresIn(envValue, defaultValue) {
    const allowedValues = [
        "1s",
        "10s",
        "30s",
        "1m",
        "10m",
        "30m",
        "1h",
        "2h",
        "1d",
        "7d",
    ];
    if (envValue && allowedValues.includes(envValue)) {
        return envValue;
    }
    return defaultValue;
}
const accessTokenOptions = {
    expiresIn: getExpiresIn(process.env.JWT_EXPIRES_IN, "1h"),
};
const refreshTokenOptions = {
    expiresIn: getExpiresIn(process.env.JWT_REFRESH_EXPIRES_IN, "7d"),
};
const generateAccessToken = (userId) => {
    return (0, jsonwebtoken_1.sign)({ userId }, ACCESS_TOKEN_SECRET, accessTokenOptions);
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (userId) => {
    return (0, jsonwebtoken_1.sign)({ userId }, REFRESH_TOKEN_SECRET, refreshTokenOptions);
};
exports.generateRefreshToken = generateRefreshToken;
const verifyRefreshToken = (token) => {
    try {
        const payload = (0, jsonwebtoken_1.verify)(token, REFRESH_TOKEN_SECRET);
        return payload;
    }
    catch (err) {
        throw new APIError_1.APIError(httpStatus_1.httpStatus.UNAUTHORIZED, "Invalid or expired refresh token");
    }
};
exports.verifyRefreshToken = verifyRefreshToken;
const verifyAccessToken = (token) => {
    try {
        const payload = (0, jsonwebtoken_1.verify)(token, ACCESS_TOKEN_SECRET);
        return payload;
    }
    catch (err) {
        throw new APIError_1.APIError(httpStatus_1.httpStatus.UNAUTHORIZED, "Invalid or expired access token");
    }
};
exports.verifyAccessToken = verifyAccessToken;
