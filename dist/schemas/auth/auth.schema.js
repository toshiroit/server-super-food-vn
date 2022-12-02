"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAuthAdminSchema = exports.checkPhoneAuthSchema = exports.loginAuthSchema = exports.loginAuthPhone = exports.verifyCodePhoneAuth = exports.phoneAuthSendCode = exports.verifyAuthSchema = exports.registerAuthSchema = void 0;
const zod_1 = require("zod");
const regexPhoneVN = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
exports.registerAuthSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)({
            required_error: 'Email is required',
        }).email('Not a valid email'),
        phone: (0, zod_1.string)({
            required_error: 'Phone is required',
        }).regex(regexPhoneVN, {
            message: 'Error phone format ',
        }),
        first_name: (0, zod_1.string)({
            required_error: 'First name is required',
        })
            .min(2, 'First name is too short - should be min 2 chars')
            .max(10, 'First name is too short - should be max 35 chars'),
        last_name: (0, zod_1.string)({
            required_error: 'Last name is required',
        })
            .min(2, 'First name is too short - should be min 2 chars')
            .max(35, 'Last name is too short - should be max 35 chars'),
        user_name: (0, zod_1.string)({
            required_error: 'User name is required',
        })
            .max(35, 'User name is too short - should be max 35 chars')
            .trim(),
        password: (0, zod_1.string)({
            required_error: 'Password is required',
        })
            .min(6, 'Password is too short - should be min 6 chars')
            .max(30, 'Password confirmation is too short - should be max 30 chars'),
        passwordConfirmation: (0, zod_1.string)({
            required_error: 'Password confirmation is required',
        })
            .min(6, 'Password is too short - should be min 6 chars')
            .max(30, 'Password confirmation is too short - should be max 30 chars'),
    }).refine(data => data.password === data.passwordConfirmation, {
        message: 'Password do not match ',
        path: ['passwordConfirmation'],
    }),
});
exports.verifyAuthSchema = (0, zod_1.object)({
    query: (0, zod_1.object)({
        code: (0, zod_1.string)({
            required_error: 'Mã xác nhận không được trống',
        }),
    }),
});
exports.phoneAuthSendCode = (0, zod_1.object)({
    body: (0, zod_1.object)({
        phone: (0, zod_1.string)({
            required_error: 'Phone is required',
        }).max(16, {
            message: 'Phone is too short - should is be max 16 chars',
        }),
    }).refine(item => item.phone.length > 0, {
        message: 'Phone is required',
    }),
});
exports.verifyCodePhoneAuth = (0, zod_1.object)({
    body: (0, zod_1.object)({
        code: (0, zod_1.string)({
            required_error: 'Không được bỏ trống ',
        })
            .min(6, {
            message: 'Tổi thiểu 6 số ',
        })
            .max(6, {
            message: 'Tối đa được 6 số ',
        }),
    }),
});
exports.loginAuthPhone = (0, zod_1.object)({
    body: (0, zod_1.object)({
        phone: (0, zod_1.string)({
            required_error: 'Phone login is required',
        })
            .max(16, {
            message: 'Phone is too short - should is be max 16 chars',
        })
            .regex(regexPhoneVN, {
            message: 'Error Phone',
        }),
        password: (0, zod_1.string)({
            required_error: 'Password login is required',
        }).max(300, {
            message: 'Password should bd max ? chars',
        }),
    }),
});
exports.loginAuthSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        phone: (0, zod_1.string)().optional(),
        password: (0, zod_1.string)().max(150, {
            message: 'Password is required',
        }),
        passwordConfirmation: (0, zod_1.string)().max(150, {
            message: 'Confirmation is required',
        }),
    }).refine(data => data.password === data.passwordConfirmation, {
        message: 'Password do not match ',
        path: ['passwordConfirmation'],
    }),
});
exports.checkPhoneAuthSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        phone: (0, zod_1.string)({
            required_error: 'Phone is required',
        })
            .max(20, {
            message: 'Phone is too short - should is be max 150 chars',
        })
            .regex(regexPhoneVN, {
            message: 'Phone VN error regex',
        }),
    }),
});
exports.loginAuthAdminSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        user_name: (0, zod_1.string)({
            required_error: 'Không được bỏ trống tên tài khoản ',
        }),
        password: (0, zod_1.string)({
            required_error: 'Không được bỏ trống mật khẩu ',
        }),
    }),
});
