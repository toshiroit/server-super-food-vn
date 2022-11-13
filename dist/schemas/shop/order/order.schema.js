"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeOrderByShopSchema = exports.hideOrderByShopSchema = void 0;
const zod_1 = require("zod");
exports.hideOrderByShopSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        is_show: (0, zod_1.boolean)({
            required_error: 'Không được để trống trường này'
        }),
        code_order: (0, zod_1.string)({
            required_error: 'Không được để trống trường này'
        })
    })
});
exports.removeOrderByShopSchema = (0, zod_1.object)({
    query: (0, zod_1.object)({
        code_order: (0, zod_1.string)({
            required_error: 'Không được để trông mã đơn hàng '
        })
    })
});
