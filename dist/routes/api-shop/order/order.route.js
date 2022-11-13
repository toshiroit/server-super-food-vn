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
const express_1 = require("express");
const routes_name_1 = require("../../../constants/routes_name");
const orderController = __importStar(require("../../../controllers/shop/order/order.controller"));
const auth_middleware_1 = require("../../../middlewares/auth/auth.middleware");
const validateResource_1 = require("../../../middlewares/validateResource");
const order_schema_1 = require("../../../schemas/shop/order/order.schema");
const router = (0, express_1.Router)();
router.get(routes_name_1.ROUTES_NAME_SHOP.ORDER.GET_ALL_ORDER_BY_SHOP, auth_middleware_1.validateTokenAdminShopMiddleware, orderController.getAllOrderByShop);
router.get(routes_name_1.ROUTES_NAME_SHOP.ORDER.GET_ALL_PRODUCT_BY_ORDER_AND_SHOP, auth_middleware_1.validateTokenAdminShopMiddleware, orderController.getAllProductByOrderAndShop);
router.post(routes_name_1.ROUTES_NAME_SHOP.ORDER.ADD_ORDER_BY_SHOP, auth_middleware_1.validateTokenAdminShopMiddleware, orderController.addOrderByShop);
router.post(routes_name_1.ROUTES_NAME_SHOP.ORDER.HIDE_ORDER_BY_SHOP, auth_middleware_1.validateTokenAdminShopMiddleware, (0, validateResource_1.validateResource)(order_schema_1.hideOrderByShopSchema), orderController.hideOrderByShop);
router.delete(routes_name_1.ROUTES_NAME_SHOP.ORDER.REMOVE_ORDER_BY_SHOP, auth_middleware_1.validateTokenAdminShopMiddleware, (0, validateResource_1.validateResource)(order_schema_1.removeOrderByShopSchema), orderController.removeOrderByShop);
exports.default = router;
