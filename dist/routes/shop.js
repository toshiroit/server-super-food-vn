"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = __importDefault(require("./api-shop/auth/auth.route"));
const product_route_1 = __importDefault(require("./api-shop/product/product.route"));
const category_route_1 = __importDefault(require("./api-shop/category/category.route"));
const routes_name_1 = require("../constants/routes_name");
const upload_route_1 = __importDefault(require("./api-shop/upload/upload.route"));
const order_route_1 = __importDefault(require("./api-shop/order/order.route"));
const router = (0, express_1.Router)();
router.use('/auth', auth_route_1.default);
router.use('/product', product_route_1.default);
router.use('/category', category_route_1.default);
router.use(routes_name_1.ROUTES_NAME_SHOP.UPLOAD.home, upload_route_1.default);
router.use(routes_name_1.ROUTES_NAME_SHOP.ORDER.HOME, order_route_1.default);
exports.default = router;
