"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_schema_1 = require("./../../../schemas/auth/auth.schema");
const auth_middleware_1 = require("./../../../middlewares/auth/auth.middleware");
const AuthController = __importStar(require("./../../../controllers/auth/auth.controller"));
const express_1 = require("express");
const validateResource_1 = require("../../../middlewares/validateResource");
const auth_schema_2 = require("../../../schemas/auth/auth.schema");
const routes_name_1 = require("../../../constants/routes_name");
const auth_middleware_2 = require("../../../middlewares/auth/auth.middleware");
const routes = (0, express_1.Router)();
/**
 * Login user
 */
routes.post(routes_name_1.ROUTES_NAME.AUTH.LOGIN, auth_middleware_2.loginAccountLimiter, (0, validateResource_1.validateResource)(auth_schema_2.loginAuthSchema), AuthController.loginUser);
/**
 * Logout user
 */
routes.post(routes_name_1.ROUTES_NAME.AUTH.LOGOUT, AuthController.logoutUser);
/**
 * Register user
 */
routes.post(routes_name_1.ROUTES_NAME.AUTH.REGISTER, (0, validateResource_1.validateResource)(auth_schema_2.registerAuthSchema), AuthController.registerUser);
/**
 * Login phone user
 */
routes.post(routes_name_1.ROUTES_NAME.AUTH.LOGIN_PHONE, auth_middleware_2.loginAccountLimiter, auth_middleware_2.validateTokenMiddleware, (0, validateResource_1.validateResource)(auth_schema_2.loginAuthSchema), AuthController.loginUser);
/**
 * Refresh token
 */
routes.post(routes_name_1.ROUTES_NAME.AUTH.REFRESH_TOKEN, AuthController.refreshToken);
/**
 * Get info user
 */
routes.get(routes_name_1.ROUTES_NAME.AUTH.USER, auth_middleware_2.validateTokenMiddleware, AuthController.getMe);
/**
 * Get All user
 * Login => true => role admin
 */
/**
 * Rest password user
 * Login => true of false => role admin - shop - user
 */
routes.post(routes_name_1.ROUTES_NAME.AUTH.REST_PASSWORD, auth_middleware_2.validateTokenMiddleware, (err, res) => {
    res.send({
        data: res.locals,
    });
});
/**
 * Verify code
 * Verify user by code save database
 */
routes.post(routes_name_1.ROUTES_NAME.AUTH.VERIFY_CODE, auth_middleware_2.validateTokenMiddleware, (err, res) => {
    res.json({
        message: 'Verify code',
    });
});
/**
 * Verify token user
 */
routes.post(routes_name_1.ROUTES_NAME.AUTH.VERIFY_TOKEN, auth_middleware_2.validateTokenMiddleware, (0, validateResource_1.validateResource)(auth_schema_2.loginAuthSchema), AuthController.VerifyTokenUser);
// Send code change phone user
routes.post(routes_name_1.ROUTES_NAME.AUTH.SEND_CODE, auth_middleware_1.sendCodeLimiter, (0, validateResource_1.validateResource)(auth_schema_2.phoneAuthSendCode), AuthController.SendCodePhone);
routes.post(routes_name_1.ROUTES_NAME.AUTH.CHECK_CODE, auth_middleware_1.sendCodeLimiter, (0, validateResource_1.validateResource)(auth_schema_1.verifyCodePhoneAuth), AuthController.verifyCodeAuth);
routes.post(`${routes_name_1.ROUTES_NAME.AUTH.VERIFY_CODE}/:id/:verificationCode`, (0, validateResource_1.validateResource)(auth_schema_2.verifyAuthSchema), AuthController.verifyAuthMailer);
routes.post(routes_name_1.ROUTES_NAME.AUTH.CHECK_PHONE, (0, validateResource_1.validateResource)(auth_schema_1.checkPhoneAuthSchema), AuthController.checkPhoneAuth);
exports.default = routes;
