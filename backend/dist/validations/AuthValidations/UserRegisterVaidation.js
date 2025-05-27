"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRegisterSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.UserRegisterSchema = joi_1.default.object({
    name: joi_1.default.string().trim().min(3).max(20).required(),
    email: joi_1.default.string().email().trim().min(3).max(30).required(),
    password: joi_1.default.string()
        .min(8)
        .max(30)
        .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$"))
        .required()
        .messages({
        "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
    }),
});
