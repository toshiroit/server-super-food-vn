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
exports.addProductShopSchema = exports.addTypeProductSchema = exports.getProductByCodeAndShopSchema = void 0;
const zod_1 = __importStar(require("zod"));
const dateSchema = (0, zod_1.preprocess)((arg) => {
    if (typeof arg == "string" || arg instanceof Date)
        return new Date(arg);
}, (0, zod_1.date)());
const literalSchema = zod_1.default.union([zod_1.default.string(), zod_1.default.number(), zod_1.default.boolean(), zod_1.default.null()]);
const jsonSchema = zod_1.default.lazy(() => zod_1.default.union([literalSchema, zod_1.default.array(jsonSchema), zod_1.default.record(jsonSchema)]));
exports.getProductByCodeAndShopSchema = (0, zod_1.object)({
    query: (0, zod_1.object)({
        code_product: (0, zod_1.string)({
            required_error: 'Mã sản phẩm không được bỏ trống'
        }).max(15, {
            message: 'Mã sản phẩm quá dài'
        })
    })
});
exports.addTypeProductSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        code_product_type: (0, zod_1.string)({
            required_error: "Mã loại sản phẩm không được bỏ trống"
        }).max(15, 'Mã sản phẩm chỉ tối đa 15 chữ '),
        name_product_type: (0, zod_1.string)({
            required_error: "Tên sản phẩm không được bỏ trống"
        }),
        status: (0, zod_1.boolean)({
            required_error: "Tình trạng không được bỏ trống"
        }),
    })
});
exports.addProductShopSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name_product: (0, zod_1.string)({
            required_error: 'Trường này không được bỏ trống'
        }).min(10, {
            message: "Tên sản phẩm phải tối thiệu 10 kí tự "
        }),
        info_product: (0, zod_1.string)({
            required_error: 'Trường này không được bỏ trống'
        }),
        description: (0, zod_1.string)({
            required_error: 'Trường này không được bỏ trống'
        }),
        guide: (0, zod_1.string)({
            required_error: 'Trường này không được bỏ trống'
        }),
        return: (0, zod_1.string)({
            required_error: 'Trường này không được bỏ trống'
        }),
        note: (0, zod_1.string)({
            required_error: 'Trường này không được bỏ trống'
        }),
        image: (0, zod_1.string)({
            required_error: 'Trường này không được bỏ trống'
        }),
        quantity: (0, zod_1.number)({
            required_error: 'Trường này không được bỏ trống'
        }).min(1, {
            message: "Số lượng sản phẩm tối thiệu phải là 1 hoặc lớn hơn"
        }),
        price: (0, zod_1.number)({
            required_error: 'Trường này không được bỏ trống'
        }).min(0, {
            message: "Giá sản phẩm tối thiệu phải lơn hơn hoặc bằng 0"
        }),
        discount: (0, zod_1.number)({
            required_error: 'Trường này không được bỏ trống'
        }).min(0, {
            message: "Giảm giá sản phẩm không được nhỏ hơn 0"
        }).max(100, {
            message: 'Giảm giá sản phẩm chỉ được tối đa 100%'
        }),
        order_max: (0, zod_1.number)({
            required_error: 'Trường này không được bỏ trống'
        }),
        date_start: (0, zod_1.string)().nullable(),
        date_end: (0, zod_1.string)().nullable(),
        status: (0, zod_1.number)({
            required_error: 'Trường này không được bỏ trống'
        }),
        isShow: (0, zod_1.number)({
            required_error: 'Trường này không được bỏ trống'
        }),
        discount_status: (0, zod_1.number)({
            required_error: 'Trường này không được bỏ trống'
        }),
        free_ship: (0, zod_1.number)({
            required_error: 'Trường này không được bỏ trống'
        }),
        type_product: jsonSchema,
        images: jsonSchema,
        code_product_type: (0, zod_1.string)({
            required_error: 'Mã loại sản phẩm'
        }).max(15, 'Mã chỉ chứa được 15 kí tự ')
    })
});
