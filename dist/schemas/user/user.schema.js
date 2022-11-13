"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserW1Schema = void 0;
const zod_1 = require("zod");
exports.updateUserW1Schema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        fullName: (0, zod_1.string)({
            required_error: "Full name is required"
        }),
        date: (0, zod_1.string)({
            required_error: "Date is required"
        }),
        sex: (0, zod_1.boolean)({
            required_error: "Sex is required"
        }),
    })
});
