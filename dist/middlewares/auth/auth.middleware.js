"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTokenMiddleware = exports.validateTokenAdminShopMiddleware = exports.validateCapChaMiddleware = exports.handleCapChaError = exports.sendCodeLimiter = exports.loginAccountLimiter = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config/config"));
const express_rate_limit_1 = require("express-rate-limit");
const handleUnauthorizedError = (next) => {
    const error = new Error('Login Error : Please try again');
    error.status = 401;
    return next(error);
};
const handlePermissionDenied = (next) => {
    const error = new Error('permission denied');
    error.status = 403;
    return next(error);
};
exports.loginAccountLimiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next) => {
        res.status(429).json({
            status: 429,
            message: 'Quá nhiều yêu cầu vui long thử lại sau 1 phút',
        });
    },
});
exports.sendCodeLimiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 16.6667,
    max: 3,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next) => {
        res.status(429).json({
            status: 429,
            message: 'Quá nhiều yêu cầu vui long thử lại sau 1 phút',
        });
    },
});
const handleCapChaError = (next) => {
    const error = new Error('capCha Error : Please try again');
    error.status = 401;
    return next(error);
};
exports.handleCapChaError = handleCapChaError;
const validateCapChaMiddleware = (req, res, next) => {
    try {
        // Get Header Authorization
        const authHeader = req.get('Authorization');
        if (authHeader) {
            const bearer = authHeader.split(' ')[0].toLowerCase();
            const token = authHeader.split(' ')[1];
            if (token && bearer === 'bearer') {
                jsonwebtoken_1.default.verify(token, config_1.default.tokenSecret, (err, decoded) => {
                    if (err) {
                        handleUnauthorizedError(next);
                    }
                    else {
                        res.locals.jwt = decoded;
                        next();
                    }
                });
            }
            else {
                handleUnauthorizedError(next);
            }
        }
        else {
            handleUnauthorizedError(next);
        }
        // Check authHeader validate
    }
    catch (error) {
        handleUnauthorizedError(next);
    }
};
exports.validateCapChaMiddleware = validateCapChaMiddleware;
const validateTokenAdminShopMiddleware = (req, res, next) => {
    try {
        const authHeader = req.get('cookie');
        if (authHeader) {
            const bearer = authHeader.split('=')[0].toLowerCase();
            const token = authHeader.split('=')[1];
            if (token && bearer === 'jwt') {
                jsonwebtoken_1.default.verify(token, config_1.default.refresh_token_secret, (err, decoded) => {
                    if (err) {
                        handleUnauthorizedError(next);
                    }
                    else {
                        if (decoded) {
                            res.locals.jwt = decoded;
                            const data = decoded;
                            if (data.code_role) {
                                if (data.code_role.trim() === 'ROLE-WIXX-SHOP') {
                                    next();
                                }
                                else if (data.code_role.trim() === 'ROLE-WIXO-USER') {
                                    handlePermissionDenied(next);
                                }
                                else {
                                    handlePermissionDenied(next);
                                }
                            }
                            else {
                                handlePermissionDenied(next);
                            }
                        }
                        res.locals.jwt = decoded;
                        //next();
                    }
                });
            }
            else {
                handleUnauthorizedError(next);
            }
        }
        else {
            handleUnauthorizedError(next);
        }
    }
    catch (error) {
        handleUnauthorizedError(next);
    }
};
exports.validateTokenAdminShopMiddleware = validateTokenAdminShopMiddleware;
const validateTokenMiddleware = (req, res, next) => {
    try {
        // Get Header Authorization
        const authHeader = req.get('cookie');
        if (authHeader) {
            const bearer = authHeader.split('=')[0].toLowerCase();
            const token = authHeader.split('=')[1];
            if (token && bearer === 'jwt') {
                jsonwebtoken_1.default.verify(token, config_1.default.refresh_token_secret, (err, decoded) => {
                    if (err) {
                        handleUnauthorizedError(next);
                    }
                    else {
                        res.locals.jwt = decoded;
                        const data = decoded;
                        if (data.code_role) {
                            if (data.code_role.trim() === 'ROLE-WIXO-USER') {
                                next();
                            }
                            else {
                                handlePermissionDenied(next);
                            }
                        }
                        else {
                            handlePermissionDenied(next);
                        }
                    }
                });
            }
            else {
                handleUnauthorizedError(next);
            }
        }
        else {
            handleUnauthorizedError(next);
        }
        // Check authHeader validate
    }
    catch (error) {
        handleUnauthorizedError(next);
    }
};
exports.validateTokenMiddleware = validateTokenMiddleware;
