"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = __importDefault(require("./api/user/user.route"));
const auth_route_1 = __importDefault(require("./api/auth/auth.route"));
const routes = (0, express_1.Router)();
/**
 * Router User
 */
routes.use(user_route_1.default);
/**
 * Route auth
 */
routes.use('/auth', auth_route_1.default);
routes.get('/', (req, res) => {
    res.json({
        message: 'Hello world',
    });
});
exports.default = routes;
