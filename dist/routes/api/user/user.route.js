"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("./../../../controllers/user/user.controller");
const express_1 = require("express");
const routes = (0, express_1.Router)();
routes.post('');
routes.post('/users', user_controller_1.UserController.createUser);
routes.get('/users', user_controller_1.UserController.getAllUser);
exports.default = routes;
