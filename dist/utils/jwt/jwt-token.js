"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = exports.jwtTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config/config"));
const jwtTokens = (userLogin) => {
    const accessToken = jsonwebtoken_1.default.sign(userLogin, config_1.default.access_token_secret, {
        issuer: 'coolIssuer',
        algorithm: 'HS256',
        expiresIn: '10s',
    });
    const refreshToken = jsonwebtoken_1.default.sign(userLogin, config_1.default.refresh_token_secret, {
        issuer: 'coolIssuer',
        algorithm: 'HS256',
        expiresIn: 60 * 60 * 24,
    });
    return { accessToken, refreshToken };
};
exports.jwtTokens = jwtTokens;
const verifyJWT = (token, configTokenVerify) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, configTokenVerify);
        return { payload: decoded, expired: false };
    }
    catch (error) {
        return { payload: null, expired: true };
    }
};
exports.verifyJWT = verifyJWT;
