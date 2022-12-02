"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressSchema = void 0;
const zod_1 = require("zod");
const regexPhoneVN = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
exports.addressSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        full_name: (0, zod_1.string)({
            required_error: 'Tên không được bỏ trống',
        }),
        phone: (0, zod_1.string)({
            required_error: 'Số điện thoại không được bỏ trống',
        }).regex(regexPhoneVN, {
            message: 'Số điện thoại không đúng định dạng',
        }),
        status: (0, zod_1.boolean)({
            required_error: 'Không được bỏ trống tình trạng',
        }),
        email: (0, zod_1.string)({
            required_error: 'Email không được bỏ trống',
        }).email({
            message: 'Email phải đúng định dạng ',
        }),
        street: (0, zod_1.string)({
            required_error: 'Không được bỏ trống',
        }),
        district: (0, zod_1.string)({
            required_error: 'Không được bỏ trống',
        }),
        province: (0, zod_1.string)({
            required_error: 'Không được bỏ trống',
        }),
        city: (0, zod_1.string)({
            required_error: 'Không được bỏ trống',
        }),
    }),
});
