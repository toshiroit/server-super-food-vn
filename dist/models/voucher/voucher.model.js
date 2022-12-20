"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoucherModel = void 0;
const database_1 = __importDefault(require("../../database"));
const sql_1 = __importDefault(require("../sql"));
class VoucherModel {
    static checkVoucherProductByVoucherShopModel(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('=> ', data.code_product);
            database_1.default.query(sql_1.default.SQL_CHECK_VOUCHER_PRODUCT_BY_SHOP(JSON.stringify(data.code_product)), [data.code_voucher], callback);
        });
    }
}
exports.VoucherModel = VoucherModel;
