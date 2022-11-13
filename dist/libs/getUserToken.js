"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataUser = void 0;
const config_1 = __importDefault(require("../config/config"));
const jwt_token_1 = require("../utils/jwt/jwt-token");
const getDataUser = (token, bearer) => {
    let result = null;
    if (token && bearer === 'jwt') {
        const user = (0, jwt_token_1.verifyJWT)(token, config_1.default.refresh_token_secret);
        delete user.payload.password;
        delete user.payload.verification_code;
        delete user.payload.passwordResetCode;
        result = user;
    }
    return result;
};
exports.getDataUser = getDataUser;
