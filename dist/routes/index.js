"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = __importDefault(require("./api/user/user.route"));
const auth_route_1 = __importDefault(require("./api/auth/auth.route"));
const product_route_1 = __importDefault(require("./api/product/product.route"));
const comment_route_1 = __importDefault(require("./api/comment/comment.route"));
const cart_route_1 = __importDefault(require("./api/cart/cart.route"));
const search_route_1 = __importDefault(require("./api/search/search.route"));
const order_route_1 = __importDefault(require("./api/order/order.route"));
const address_route_1 = __importDefault(require("./api/address/address.route"));
const routes_name_1 = require("../constants/routes_name");
const router = (0, express_1.Router)();
/**
 *
 * Router test
 */
/**
 * Router User
 */
router.use(user_route_1.default);
/**
 * Route auth
 */
router.use('/auth', auth_route_1.default);
router.use('/product', product_route_1.default);
router.use('/comment', comment_route_1.default);
router.use('/cart', cart_route_1.default);
router.use('/search', search_route_1.default);
router.use('/user', user_route_1.default);
router.use(routes_name_1.ROUTES_NAME.ADDRESS.HOME, address_route_1.default);
router.use(routes_name_1.ROUTES_NAME.ORDER.HOME, order_route_1.default);
router.get('/', (res) => {
    res.json({
        message: 'Hello world',
    });
});
exports.default = router;
