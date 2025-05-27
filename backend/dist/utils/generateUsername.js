"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUsername = void 0;
const generateUsername = (email) => {
    return email.split("@")[0];
};
exports.generateUsername = generateUsername;
