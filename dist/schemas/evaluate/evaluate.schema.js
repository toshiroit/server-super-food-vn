"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addEvaluateByProductSchema = void 0;
const zod_1 = __importStar(require("zod"));
const literalSchema = zod_1.default.union([zod_1.default.string(), zod_1.default.number(), zod_1.default.boolean(), zod_1.default.null()]);
const jsonSchema = zod_1.default.lazy(() => zod_1.default.union([literalSchema, zod_1.default.array(jsonSchema), zod_1.default.record(jsonSchema)]));
exports.addEvaluateByProductSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        code_product: (0, zod_1.string)({
            required_error: 'Không được bỏ trống ',
        }),
        evaluate_product: (0, zod_1.number)({
            required_error: 'Không được bỏ trống ',
        }).min(1, {
            message: 'Tối thiểu phải là 1',
        }),
        evaluate_ship: (0, zod_1.number)({
            required_error: 'Không được bỏ trống ',
        }).min(1, {
            message: 'Tối thiểu phải là 1',
        }),
        evaluate_progress: (0, zod_1.number)({
            required_error: 'Không được bỏ trống ',
        }).min(1, {
            message: 'Tối thiểu phải là 1',
        }),
        images: jsonSchema,
        text: (0, zod_1.string)({
            required_error: 'Không được bỏ trống ',
        }).max(500, {
            message: 'Tối đa 500 kí tự',
        }),
        code_order: (0, zod_1.string)({
            required_error: 'Không được bỏ trống ',
        }),
    }),
});
