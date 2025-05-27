"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLoginSchema = exports.UserRegisterSchema = void 0;
// import all auth validations
const UserRegisterVaidation_1 = require("./AuthValidations/UserRegisterVaidation");
Object.defineProperty(exports, "UserRegisterSchema", { enumerable: true, get: function () { return UserRegisterVaidation_1.UserRegisterSchema; } });
const UserLoginValidations_1 = require("./AuthValidations/UserLoginValidations");
Object.defineProperty(exports, "UserLoginSchema", { enumerable: true, get: function () { return UserLoginValidations_1.UserLoginSchema; } });
