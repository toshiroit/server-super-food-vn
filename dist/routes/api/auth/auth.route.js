"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("./../../../controllers/auth/auth.controller");
const express_1 = require("express");
const validateResource_1 = require("../../../middlewares/validateResource");
const auth_schema_1 = require("../../../schemas/auth/auth.schema");
const routes_nane_1 = require("../../../constants/routes_nane");
const routes = (0, express_1.Router)();
routes.post(routes_nane_1.ROUTES_NAME.AUTH.LOGIN, (0, validateResource_1.validateResource)(auth_schema_1.loginAuthSchema), auth_controller_1.AuthController.LoginUser);
routes.post(routes_nane_1.ROUTES_NAME.AUTH.REGISTER, (0, validateResource_1.validateResource)(auth_schema_1.registerAuthSchema), auth_controller_1.AuthController.registerUser);
routes.post(routes_nane_1.ROUTES_NAME.AUTH.AUTHENTICATE);
routes.post(routes_nane_1.ROUTES_NAME.AUTH.REST_PASSWORD, (err, res) => { });
routes.post(routes_nane_1.ROUTES_NAME.AUTH.VERIFY_CODE, (err, res) => { });
routes.post(`${routes_nane_1.ROUTES_NAME.AUTH.VERIFY_CODE}/:id/:verificationCode`, (0, validateResource_1.validateResource)(auth_schema_1.verifyAuthSchema), auth_controller_1.AuthController.verifyAuthMailer);
exports.default = routes;