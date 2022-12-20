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
const database_1 = __importDefault(require("../../../database"));
const nonAccentVietnamese_1 = require("../../../libs/nonAccentVietnamese");
const Model_1 = __importDefault(require("../../Model"));
const sql_1 = __importDefault(require("../../sql"));
class VoucherModel extends Model_1.default {
    static getAllVoucherModel(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql_result = sql_1.default.SQL_GET_ALL_VOUCHER_BY_SHOP();
            if (data.data_filter) {
                if (data.data_filter.name_voucher &&
                    data.data_filter.name_voucher !== 'null' &&
                    data.data_filter.name_voucher !== 'undefined' &&
                    data.data_filter.name_voucher.length > 0) {
                    sql_result += ` and converttvkdau(v.name_voucher) ilike '%${(0, nonAccentVietnamese_1.toLowerCaseNonAccentVietnamese)(data.data_filter.name_voucher)}%' `;
                }
                if (data.data_filter.time_start &&
                    data.data_filter.time_end &&
                    data.data_filter.time_start !== 'null' &&
                    data.data_filter.time_end !== 'null' &&
                    data.data_filter.time_start !== 'undefined' &&
                    data.data_filter.time_end !== 'undefined') {
                    sql_result += ` and v.time_start BETWEEN '${data.data_filter.time_start}' and '${data.data_filter.time_end}'  `;
                }
            }
            database_1.default.query(sql_result, [data.code_shop], callback);
        });
    }
    static addNewVoucherModel(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataSQL = [
                data.code_voucher,
                data.name_voucher,
                data.price_voucher,
                data.code_type_voucher,
                data.description,
                data.code_w_voucher,
                data.time_start,
                data.time_end,
                data.createdat,
                data.quality,
                data.code_shop,
                JSON.stringify(data.code_product),
                data.type_price === 'price' ? 1 : 2,
            ];
            database_1.default.query(sql_1.default.SQL_ADD_NEW_VOUCHER_BY_SHOP(), dataSQL, callback);
        });
    }
    static updateDataVoucherModel(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataSQL = [
                data.name_voucher,
                data.price_voucher,
                data.code_type_voucher,
                data.description,
                data.code_w_voucher,
                data.time_start,
                data.time_end,
                data.updatedat,
                data.quality,
                JSON.stringify(data.code_product),
                data.type_price === 'price' ? 1 : 2,
                data.code_shop,
                data.code_voucher,
            ];
            database_1.default.query(sql_1.default.SQL_UPDATE_VOUCHER_BY_CODE_VOUCHER_AND_SHOP(), dataSQL, callback);
        });
    }
    static removeDataVoucherModel(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataSQL = [data.code_shop, data.code_voucher];
            database_1.default.query(sql_1.default.SQL_REMOVE_VOUCHER_BY_SHOP_AND_VOUCHER(), dataSQL, callback);
        });
    }
    static getDetailVoucherModel(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query(sql_1.default.SQL_GET_DETAIL_VOUCHER_SHOP_BY_CODE(), [data.code_shop, data.code_voucher], callback);
        });
    }
}
exports.VoucherModel = VoucherModel;
