"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLoginSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.UserLoginSchema = joi_1.default.object({
    email: joi_1.default.string().email().trim().required(),
    password: joi_1.default.string()
        .min(8)
        .max(30)
        .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$"))
        .required()
        .messages({
        "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
    }),
});
