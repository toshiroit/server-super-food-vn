"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderDetailByCodeOrderSchema = void 0;
const zod_1 = require("zod");
exports.getOrderDetailByCodeOrderSchema = (0, zod_1.object)({
    query: (0, zod_1.object)({
        code_order: (0, zod_1.string)({
            required_error: "Mã dơn hàng không được bỏ trống "
        })
    })
});
