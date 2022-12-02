"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRegisterShop = void 0;
const zod_1 = require("zod");
const regexPhoneVN = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
exports.authRegisterShop = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name_shop: (0, zod_1.string)({
            required_error: 'Không được bỏ trống tên shop'
        }).max(150, {
            message: 'Tên chỉ có tối thiệu 150 kí tự '
        }),
        email: (0, zod_1.string)({
            required_error: 'Không được bỏ trống email'
        }).email({
            message: 'Email Không đúng định dạng'
        }),
        name: (0, zod_1.string)({
            required_error: 'Không được để tên trống'
        }).max(150, {
            message: 'Tên chỉ có tối thiệu 150 kí tự '
        }),
        birth_date: (0, zod_1.string)({
            required_error: 'Ngày sinh không được để trống'
        }),
        gender: (0, zod_1.number)({
            required_error: 'Giới tính không được bỏ trống'
        }),
        password: (0, zod_1.string)({
            required_error: 'Mật khẩu không được bỏ trống'
        }),
        phone: (0, zod_1.string)({
            required_error: 'Số điện thoại không được bỏ trống'
        }).regex(regexPhoneVN, {
            message: 'Số điện thoại không đúng định dạng'
        }),
        phone_shop: (0, zod_1.string)({
            required_error: 'Số điện thoại không được bỏ trống'
        }).regex(regexPhoneVN, {
            message: 'Số điện thoại không đúng định dạng'
        }),
        username: (0, zod_1.string)({
            required_error: 'Tên đăng nhập không để trống'
        }).max(200, 'Tên đăng nhập quá dài')
    })
});
