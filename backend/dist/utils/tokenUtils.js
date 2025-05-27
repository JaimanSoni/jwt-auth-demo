import { config } from "dotenv";
import { sign, verify } from "jsonwebtoken";
import { APIError } from "./APIError.js";
import { httpStatus } from "./httpStatus.js";
config();
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
export const generateAccessToken = (userId) => {
    return sign({ userId }, ACCESS_TOKEN_SECRET, accessTokenOptions);
};
export const generateRefreshToken = (userId) => {
    return sign({ userId }, REFRESH_TOKEN_SECRET, refreshTokenOptions);
};
export const verifyRefreshToken = (token) => {
    try {
        const payload = verify(token, REFRESH_TOKEN_SECRET);
        return payload;
    }
    catch (err) {
        throw new APIError(httpStatus.UNAUTHORIZED, "Invalid or expired refresh token");
    }
};
export const verifyAccessToken = (token) => {
    try {
        const payload = verify(token, ACCESS_TOKEN_SECRET);
        return payload;
    }
    catch (err) {
        throw new APIError(httpStatus.UNAUTHORIZED, "Invalid or expired access token");
    }
};
