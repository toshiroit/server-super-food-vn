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
const userController = __importStar(require("../../../controllers/user/user.controller"));
const express_1 = require("express");
const routes_name_1 = require("../../../constants/routes_name");
const auth_middleware_1 = require("../../../middlewares/auth/auth.middleware");
const validateResource_1 = require("../../../middlewares/validateResource");
const user_schema_1 = require("../../../schemas/user/user.schema");
const router = (0, express_1.Router)();
router.post('');
router.put(routes_name_1.ROUTES_NAME.USER.UPDATE_USER, auth_middleware_1.validateTokenMiddleware, (0, validateResource_1.validateResource)(user_schema_1.updateUserW1Schema), userController.updateUser);
exports.default = router;
