"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessTokenCookieOptions = exports.refreshTokenCookieOptions = void 0;
exports.refreshTokenCookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
};
exports.accessTokenCookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 1000,
};
