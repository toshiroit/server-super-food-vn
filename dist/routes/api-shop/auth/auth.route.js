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
const auth_schema_1 = require("./../../../schemas/shop/auth/auth.schema");
const routes_name_1 = require("./../../../constants/routes_name");
const express_1 = require("express");
const auth_controller_1 = require("../../../controllers/auth/auth.controller");
const auth_middleware_1 = require("../../../middlewares/auth/auth.middleware");
const validateResource_1 = require("../../../middlewares/validateResource");
const auth_schema_2 = require("../../../schemas/auth/auth.schema");
const auth_schema_3 = require("../../../schemas/shop/auth/auth.schema");
const authShopController = __importStar(require("../../../controllers/shop/auth/auth.controller"));
const authController = __importStar(require("../../../controllers/auth/auth.controller"));
const router = (0, express_1.Router)();
router.post('/login', (0, validateResource_1.validateResource)(auth_schema_2.loginAuthAdminSchema), auth_controller_1.loginAuthAdmin);
router.post(routes_name_1.ROUTES_NAME_SHOP.AUTH.VERIFICATION_ACCOUNT, authShopController.activeAccountRegister);
router.get(routes_name_1.ROUTES_NAME_SHOP.AUTH.GET_ME, auth_middleware_1.validateTokenAdminShopMiddleware, auth_controller_1.getMe);
router.get(routes_name_1.ROUTES_NAME_SHOP.AUTH.GET_ME_SHOP, auth_middleware_1.validateTokenAdminShopMiddleware, auth_controller_1.getMeShop);
router.post(routes_name_1.ROUTES_NAME_SHOP.AUTH.REGISTER, (0, validateResource_1.validateResource)(auth_schema_3.authRegisterShop), authShopController.authRegister);
router.post(routes_name_1.ROUTES_NAME_SHOP.VERIFICATION.GET_VERIFICATION, (0, validateResource_1.validateResource)(auth_schema_3.authVerificationCode), authShopController.getCodeVerificationAccount);
router.post(routes_name_1.ROUTES_NAME_SHOP.AUTH.LOGOUT, authController.logoutUser);
router.get(routes_name_1.ROUTES_NAME_SHOP.AUTH.CHECK_PASSWORD, auth_middleware_1.validateTokenAdminShopMiddleware, authShopController.authCheckPasswordByUserShop);
router.post(routes_name_1.ROUTES_NAME_SHOP.AUTH.UPDATE_USER, auth_middleware_1.validateTokenAdminShopMiddleware, (0, validateResource_1.validateResource)(auth_schema_1.authUpdateUserByShopSchema), authShopController.authUpdateUserByShop);
exports.default = router;
