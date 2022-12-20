"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRegisterShop = exports.authUpdateUserByShopSchema = exports.authVerificationCode = void 0;
const zod_1 = require("zod");
const regexPhoneVN = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
exports.authVerificationCode = (0, zod_1.object)({
    body: (0, zod_1.object)({
        username: (0, zod_1.string)({
            required_error: 'Không được bỏ trống tài khoản của bạn',
        }),
    }),
});
exports.authUpdateUserByShopSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        full_name: (0, zod_1.string)({
            required_error: 'Không được bổ trống trường này',
        }).max(150, 'Chỉ chưa tối đa 150 kí tự'),
        email: (0, zod_1.string)({
            required_error: 'Không được bỏ trống trường này',
        }).email('Email không đúng định dạng'),
        date: (0, zod_1.string)({
            required_error: 'Không được bỏ trống trường này',
        }),
        phone: (0, zod_1.string)({
            required_error: 'Không được bỏ trống trường này',
        }).regex(regexPhoneVN, {
            message: 'Không được bỏ trống trường này',
        }),
        name_shop: (0, zod_1.string)({
            required_error: 'Không được bỏ trống trường này',
        }).max(100, {
            message: 'Tên Shop quá dài',
        }),
        avatar: (0, zod_1.string)({
            required_error: 'Hình ảnh không được bỏ trống',
        }),
    }),
});
exports.authRegisterShop = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name_shop: (0, zod_1.string)({
            required_error: 'Không được bỏ trống tên shop',
        }).max(150, {
            message: 'Tên chỉ có tối thiệu 150 kí tự ',
        }),
        email: (0, zod_1.string)({
            required_error: 'Không được bỏ trống email',
        }).email({
            message: 'Email Không đúng định dạng',
        }),
        full_name: (0, zod_1.string)({
            required_error: 'Không được để tên trống',
        }).max(150, {
            message: 'Tên chỉ có tối thiệu 150 kí tự ',
        }),
        birth_date: (0, zod_1.string)({
            required_error: 'Ngày sinh không được để trống',
        }),
        gender: (0, zod_1.number)({
            required_error: 'Giới tính không được bỏ trống',
        }),
        password: (0, zod_1.string)({
            required_error: 'Mật khẩu không được bỏ trống',
        }),
        phone: (0, zod_1.string)({
            required_error: 'Số điện thoại không được bỏ trống',
        }).regex(regexPhoneVN, {
            message: 'Số điện thoại không đúng định dạng',
        }),
        phone_shop: (0, zod_1.string)({
            required_error: 'Số điện thoại không được bỏ trống',
        }).regex(regexPhoneVN, {
            message: 'Số điện thoại không đúng định dạng',
        }),
        username: (0, zod_1.string)({
            required_error: 'Tên đăng nhập không để trống',
        }).max(200, 'Tên đăng nhập quá dài'),
        detail_address: (0, zod_1.string)(),
        avatar: (0, zod_1.string)(),
        street: (0, zod_1.string)({
            required_error: 'Không được bỏ trống trường này',
        }),
        village: (0, zod_1.string)({
            required_error: 'Không được bỏ trống trường này',
        }),
        district: (0, zod_1.string)({
            required_error: 'Không được bỏ trống trường này',
        }),
        city: (0, zod_1.string)({
            required_error: 'Không được bỏ trống trường này',
        }),
        type_login: (0, zod_1.number)({
            required_error: 'Không được bỏ trống trường này',
        }),
        description: (0, zod_1.string)({
            required_error: 'Thông tin cửa hàng không được bỏ trống',
        }).max(500, {
            message: 'Tối đa chỉ được 500 kí tự',
        }),
    }),
});
