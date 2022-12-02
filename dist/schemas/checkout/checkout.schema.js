"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkoutSchema = void 0;
const zod_1 = require("zod");
exports.checkoutSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        code_address: (0, zod_1.string)({
            required_error: 'Không được bỏ trống mã địa chỉ'
        }).max(15, 'Mã chỉ tối đa 15 kí tự'),
        code_product: (0, zod_1.string)({
            required_error: 'Không được bỏ trống sản phẩm đặt'
        }),
        code_payment: (0, zod_1.string)({
            required_error: "Không được bỏ trồng mã loại thanh toán"
        }).max(15, 'Mã chỉchứa tối đa 15 kí tự'),
        quatity: (0, zod_1.number)({
            required_error: 'Số lượng sản phẩm không được bỏ trống'
        }),
        total_order: (0, zod_1.number)({
            required_error: 'Tổng đơn hàng không được bỏ trống'
        })
    })
});
