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
exports.resetPassword = exports.forgetPassword = exports.refreshAccessToken = exports.logout = exports.login = exports.register = void 0;
const asyncHandler = require("express-async-handler");
const APIError_1 = require("../utils/APIError");
const httpStatus_1 = require("../utils/httpStatus");
const generateUsername_1 = require("../utils/generateUsername");
const user_model_1 = require("../models/user.model");
const validations_1 = require("../validations");
const APIResponse_1 = require("../utils/APIResponse");
const cookieOptions_1 = require("../utils/cookieOptions");
const tokenUtils_1 = require("../utils/tokenUtils");
const emailUtils_1 = require("../utils/emailUtils");
const crypto = require("crypto");
exports.register = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = validations_1.UserRegisterSchema.validate(req.body);
    if (error) {
        throw new APIError_1.APIError(httpStatus_1.httpStatus.BAD_REQUEST, error.details[0].message);
    }
    const { name, email, password } = value;
    const isUserAlreadyExist = yield user_model_1.User.findOne({ email });
    if (isUserAlreadyExist) {
        throw new APIError_1.APIError(httpStatus_1.httpStatus.BAD_REQUEST, "User already exists.");
    }
    const username = (0, generateUsername_1.generateUsername)(email);
    try {
        const newUser = yield user_model_1.User.create({
            name,
            username,
            email,
            password,
        });
        const id = newUser._id.toString();
        const refreshToken = (0, tokenUtils_1.generateRefreshToken)(id);
        const accessToken = (0, tokenUtils_1.generateAccessToken)(id);
        newUser.refresh_token = refreshToken;
        yield newUser.save();
        res.cookie("refreshToken", refreshToken, cookieOptions_1.refreshTokenCookieOptions);
        res.cookie("accessToken", accessToken, cookieOptions_1.accessTokenCookieOptions);
        return res.status(httpStatus_1.httpStatus.CREATED).json(new APIResponse_1.APIResponse(httpStatus_1.httpStatus.CREATED, {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            username: newUser.username,
            accessToken,
        }, "User Created Successfully"));
    }
    catch (err) {
        throw new APIError_1.APIError(httpStatus_1.httpStatus.BAD_REQUEST, "Something went wrong.");
    }
}));
exports.login = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = validations_1.UserLoginSchema.validate(req.body);
    if (error) {
        throw new APIError_1.APIError(httpStatus_1.httpStatus.BAD_REQUEST, error.details[0].message);
    }
    const { email, password } = value;
    const user = yield user_model_1.User.findOne({ email });
    if (!user) {
        throw new APIError_1.APIError(httpStatus_1.httpStatus.NOT_FOUND, "User does not exist.");
    }
    const isPasswordValid = yield user.comparePassword(password);
    if (!isPasswordValid) {
        throw new APIError_1.APIError(httpStatus_1.httpStatus.UNAUTHORIZED, "Invalid credentials.");
    }
    const id = user._id.toString();
    const refreshToken = (0, tokenUtils_1.generateRefreshToken)(id);
    const accessToken = (0, tokenUtils_1.generateAccessToken)(id);
    res.cookie("refreshToken", refreshToken, cookieOptions_1.refreshTokenCookieOptions);
    res.cookie("accessToken", accessToken, cookieOptions_1.accessTokenCookieOptions);
    user.refresh_token = refreshToken;
    yield user.save();
    return res.status(httpStatus_1.httpStatus.OK).json(new APIResponse_1.APIResponse(httpStatus_1.httpStatus.OK, {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        accessToken,
    }, "Login Successful"));
}));
exports.logout = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const refresh_token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.refreshToken;
    if (!refresh_token) {
        return res
            .status(httpStatus_1.httpStatus.UNAUTHORIZED)
            .json(new APIResponse_1.APIResponse(httpStatus_1.httpStatus.UNAUTHORIZED, null, "No refresh token found"));
    }
    const user = yield user_model_1.User.findOne({ refresh_token });
    if (user) {
        user.refresh_token = null;
        yield user.save();
    }
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    return res
        .status(httpStatus_1.httpStatus.OK)
        .json(new APIResponse_1.APIResponse(httpStatus_1.httpStatus.OK, null, "Logout successful"));
}));
exports.refreshAccessToken = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.refreshToken;
    console.log("Incoming Token: ", token);
    if (!token) {
        return res.status(403).json({ message: "No refresh token found" });
    }
    let payload;
    try {
        payload = (0, tokenUtils_1.verifyRefreshToken)(token);
    }
    catch (err) {
        return res
            .status(403)
            .json({ message: "Invalid or expired refresh token" });
    }
    console.log("Payload", payload);
    const user = yield user_model_1.User.findById(payload.userId);
    console.log("User", token);
    console.log("Cient", user === null || user === void 0 ? void 0 : user.refresh_token);
    if (!user || user.refresh_token !== token) {
        return res.status(403).json({ message: "Refresh token mismatch" });
    }
    const userId = user._id.toString();
    const newAccessToken = (0, tokenUtils_1.generateAccessToken)(userId);
    const newRefreshToken = (0, tokenUtils_1.generateRefreshToken)(userId);
    user.refresh_token = newRefreshToken;
    yield user.save();
    res.cookie("refreshToken", newRefreshToken, cookieOptions_1.refreshTokenCookieOptions);
    res.cookie("accessToken", newAccessToken, cookieOptions_1.accessTokenCookieOptions);
    return res.status(200).json({ accessToken: newAccessToken });
}));
exports.forgetPassword = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const user = yield user_model_1.User.findOne({ email });
    if (!user)
        return res.status(404).json({ message: "User not found" });
    const resetToken = user.createPasswordResetToken();
    yield user.save();
    yield (0, emailUtils_1.sendResetEmail)(email, resetToken);
    res.json({ message: "Reset email sent", token: resetToken });
}));
exports.resetPassword = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params);
    const hashedToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");
    const user = yield user_model_1.User.findOne({
        password_reset_token: hashedToken,
        password_reset_expires: { $gt: Date.now() },
    });
    if (!user)
        return res.status(400).json({ message: "Token invalid or expired" });
    user.password = req.body.password;
    user.password_reset_token = undefined;
    user.password_reset_expires = undefined;
    yield user.save();
    res.json({ message: "Password reset successful" });
}));
