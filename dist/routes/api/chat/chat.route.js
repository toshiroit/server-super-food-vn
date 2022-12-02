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
const auth_middleware_1 = require("./../../../middlewares/auth/auth.middleware");
const routes_name_1 = require("./../../../constants/routes_name");
const express_1 = require("express");
const messengerChatController = __importStar(require("../../../controllers/chat/chat.controller"));
const router = (0, express_1.Router)();
router.post(routes_name_1.ROUTES_NAME.CHAT.SEND_CHAT, auth_middleware_1.validateTokenMiddleware, messengerChatController.sendMessengerChat);
router.get(routes_name_1.ROUTES_NAME.CHAT.GET_ALL_CHAT, auth_middleware_1.validateTokenMiddleware, messengerChatController.getAllMessengerChatByCode);
exports.default = router;
