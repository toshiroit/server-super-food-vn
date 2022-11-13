"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCartSchema = void 0;
const zod_1 = require("zod");
exports.removeCartSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        code_cart: (0, zod_1.string)({
            required_error: "Không được bỏ trống mã giỏ hàng "
        })
    })
});
