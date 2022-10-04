"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAuthSchema = exports.verifyAuthSchema = exports.registerAuthSchema = void 0;
const zod_1 = require("zod");
exports.registerAuthSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)({
            required_error: 'Email is required',
        }).email('Not a valid email'),
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
            .min(15, 'User name is too short - should be min 15 chars')
            .trim()
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
    params: (0, zod_1.object)({
        id: (0, zod_1.string)(),
        verificationCode: (0, zod_1.string)({
            required_error: 'VerificationCode is required',
        })
            .min(10, 'Verification Code is too short - should be min 10 chars')
            .trim()
            .max(100, 'Verification Code is too short - should be max 100 chars')
            .trim(),
    }).required(),
});
exports.loginAuthSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        phone: (0, zod_1.string)().optional(),
        username: (0, zod_1.string)().max(150, { message: 'Username login is too short - should is be max 150 chars' }).optional(),
        password: (0, zod_1.string)().max(150, {
            message: 'Password is required',
        }),
        passwordConfirmation: (0, zod_1.string)().max(150, {
            message: 'Confirmation is required',
        }),
    })
        .refine(data => {
        if (!data.phone && !data.username)
            return false;
        if (!data.phone && data.username)
            return true;
        if (data.phone && !data.username)
            return true;
        if (data.phone && data.username)
            return true;
    }, {
        message: 'Phone and username is required',
    })
        .refine(data => data.password === data.passwordConfirmation, {
        message: 'Password do not match ',
        path: ['passwordConfirmation'],
    }),
});
