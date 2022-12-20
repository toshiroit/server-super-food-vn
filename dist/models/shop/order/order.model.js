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
exports.OrderModel = void 0;
const database_1 = __importDefault(require("../../../database"));
const getPagination_1 = require("../../../libs/getPagination");
const nonAccentVietnamese_1 = require("../../../libs/nonAccentVietnamese");
const Model_1 = __importDefault(require("../../Model"));
const sql_1 = __importDefault(require("../../sql"));
class OrderModel extends Model_1.default {
    static getAllOrderByShop(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql_result = sql_1.default.SQL_GET_ALL_ORDER_BY_SHOP();
            const { offset, limit } = (0, getPagination_1.getPagination)(data.page, 10);
            if (data.type === 'new_order') {
                sql_result += 'AND od.progress = -1  and od.progress > -2 ';
            }
            if (data.type === 'check_out') {
                sql_result += 'AND (od.progress = 1 or od.progress=2  and od.progress > -2) ';
            }
            else if (data.type === 'ship') {
                sql_result += ' AND (od.progress = 3  and od.progress > -2) ';
            }
            else if (data.type === 'processing') {
                sql_result += ' AND (od.progress = 2 or od.progress= 3  and od.progress > -2) ';
            }
            else if (data.type === 'all') {
                sql_result += ' ';
            }
            else if (data.type === 'check_out_2') {
                sql_result += 'AND (od.progress = 1 and od.progress > -2) ';
            }
            else if (data.type === 'ship_start') {
                sql_result += ' AND (od.progress = 5  and od.progress > -2) ';
            }
            else if (data.type === 'ship_success') {
                sql_result += ' AND (od.progress = 6  and od.progress > -2) ';
            }
            else {
                sql_result += ' and od.progress > -2 ';
            }
            if (data.value_search) {
                if (data.value_search.name_search && data.value_search.name_search !== 'null') {
                    sql_result += ` and o.code_order = '${data.value_search.name_search}' or converttvkdau(ad.full_name) ilike '%${(0, nonAccentVietnamese_1.toLowerCaseNonAccentVietnamese)(data.value_search.name_search)}%' `;
                }
                if (data.value_search.date_start !== 'null' && data.value_search.date_end && data.value_search.date_end !== 'null') {
                    sql_result += ` and o.date_order BETWEEN '${data.value_search.date_start}' and '${data.value_search.date_end}' `;
                }
                if (data.value_search.status_order && data.value_search.status_order !== -99) {
                    sql_result += ` and od.progress = ${data.value_search.status_order} `;
                }
                if (data.value_search.type_payment && data.value_search.type_payment !== -99) {
                    const code_payment = data.value_search.type_payment === 1 ? 'PAYMENT_4912W_1' : 'PAYMENT_4912W_2';
                    sql_result += ` and od.code_payment = '${code_payment}'`;
                }
            }
            sql_result += ` and od.code_shop=($1) `;
            sql_result += 'ORDER BY o.date_order DESC ';
            sql_result += ` LIMIT ${10} OFFSET ${offset} `;
            database_1.default.query(sql_result, [data.code_shop], callback);
        });
    }
    static getCountOrderByShop(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql_result = sql_1.default.SQL_COUNT_ALL_ORDER_BY_SHOP();
            if (data.type === 'new_order') {
                sql_result += 'AND od.progress = -1  and od.progress > -2 ';
            }
            if (data.type === 'check_out') {
                sql_result += 'AND (od.progress = 1 or od.progress=2  and od.progress > -2) ';
            }
            else if (data.type === 'ship') {
                sql_result += ' AND (od.progress = 3  and od.progress > -2) ';
            }
            else if (data.type === 'processing') {
                sql_result += ' AND (od.progress = 2 or od.progress= 3  and od.progress > -2) ';
            }
            else if (data.type === 'all') {
                sql_result += ' ';
            }
            else if (data.type === 'check_out_2') {
                sql_result += 'AND (od.progress = 1 and od.progress > -2) ';
            }
            else if (data.type === 'ship_start') {
                sql_result += ' AND (od.progress = 5  and od.progress > -2) ';
            }
            else if (data.type === 'ship_success') {
                sql_result += ' AND (od.progress = 6  and od.progress > -2) ';
            }
            else {
                sql_result += ' and od.progress > -2 ';
            }
            if (data.value_search) {
                if (data.value_search.name_search && data.value_search.name_search !== 'null') {
                    sql_result += ` and o.code_order = '${data.value_search.name_search}' or converttvkdau(ad.full_name) ilike '%${(0, nonAccentVietnamese_1.toLowerCaseNonAccentVietnamese)(data.value_search.name_search)}%' `;
                }
                if (data.value_search.date_start !== 'null' && data.value_search.date_end && data.value_search.date_end !== 'null') {
                    sql_result += ` and o.date_order BETWEEN '${data.value_search.date_start}' and '${data.value_search.date_end}' `;
                }
                if (data.value_search.status_order && data.value_search.status_order !== -99) {
                    sql_result += ` and od.progress = ${data.value_search.status_order} `;
                }
                if (data.value_search.type_payment && data.value_search.type_payment !== -99) {
                    const code_payment = data.value_search.type_payment === 1 ? 'PAYMENT_4912W_1' : 'PAYMENT_4912W_2';
                    sql_result += ` and od.code_payment = '${code_payment}'`;
                }
            }
            return database_1.default.query(sql_result, [data.code_shop]);
        });
    }
    static getAllProductByOrderAndShop(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query(sql_1.default.SQL_GET_ALL_PRODUCT_BY_ORDER_AND_SHOP(), [data.code_shop], callback);
        });
    }
    static hideOrderByShop(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataSQL = [data.is_show, data.code_shop, data.code_order];
            database_1.default.query(sql_1.default.SQL_HIDE_ORDER_BY_SHOP(), [dataSQL], callback);
        });
    }
    static removeOrderByShopModel(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query(sql_1.default.SQL_REMOVE_ORDER_SHOP(), [data.code_shop, data.code_order], callback);
        });
    }
    static getOrderDetailByOrderAndShop(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query(sql_1.default.SQL_GET_ORDER_DETAIL_BY_ORDER_AND_SHOP(), [data.code_shop, data.code_order], callback);
        });
    }
    static confirmOrderByCodeOrderModel(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query(sql_1.default.SQL_UPDATE_ORDER_BY_CODE_ORDER(), [data.code_order, data.code_shop, data.value], callback);
        });
    }
}
exports.OrderModel = OrderModel;
