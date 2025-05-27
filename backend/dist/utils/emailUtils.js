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
exports.sendResetEmail = void 0;
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.APP_PASSWORD,
    },
});
const sendResetEmail = (email, token) => __awaiter(void 0, void 0, void 0, function* () {
    const resetURL = `${process.env.NODE_ENV === "development"
        ? process.env.LOCAL_CLIENT_URL
        : process.env.HOSTED_CLIENT_URL}/reset-password/${token}`;
    yield transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Password Reset",
        html: `<p>Reset your password here: <a href="${resetURL}">${resetURL}</a></p>`,
    });
});
exports.sendResetEmail = sendResetEmail;
