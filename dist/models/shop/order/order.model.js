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
const Model_1 = __importDefault(require("../../Model"));
const sql_1 = __importDefault(require("../../sql"));
class OrderModel extends Model_1.default {
    static getAllOrderByShop(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql_result = sql_1.default.SQL_GET_ALL_ORDER_BY_SHOP();
            if (data.type === 'new_order') {
                sql_result += 'AND od.progress = -1  and od.progress > -2 ';
            }
            if (data.type === 'check_out') {
                sql_result += 'AND od.progress = 1 or od.progress=2  and od.progress > -2 ';
            }
            else if (data.type === 'ship') {
                sql_result += 'AND od.progress = 3  and od.progress > -2 ';
            }
            else {
                sql_result += ' and od.progress > -2 ';
            }
            sql_result += 'ORDER BY o.date_order DESC ';
            database_1.default.query(sql_result, [data.code_shop], callback);
        });
    }
    static getCountOrderByShop(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql_result = sql_1.default.SQL_COUNT_ALL_ORDER_BY_SHOP();
            if (data.type === 'new_order') {
                sql_result += 'AND od.progress = -1 and od.progress > -2 ';
            }
            if (data.type === 'check_out') {
                sql_result += 'AND od.progress = 1 or od.progress=2  and od.progress > -2 ';
            }
            else if (data.type === 'ship') {
                sql_result += 'AND od.progress = 3  and od.progress > -2 ';
            }
            else {
                sql_result += ' and od.progress > -2 ';
            }
            console.log(sql_result);
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
