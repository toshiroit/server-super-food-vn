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
const config_1 = __importDefault(require("../../config/config"));
const database_1 = __importDefault(require("../../database"));
const getPagination_1 = require("../../libs/getPagination");
const Model_1 = __importDefault(require("../Model"));
const sql_1 = __importDefault(require("../sql"));
class OrderModel extends Model_1.default {
    static getOrderByUserModel(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataSQL = [data.codeUser];
            const { limit, offset } = (0, getPagination_1.getPagination)(Number(data.page || 0) === 0 ? 1 : Number(data.page), Number(config_1.default.order_user_limit_show));
            let queryOrder = '';
            if (limit !== null && offset !== null) {
                queryOrder += ` LIMIT ${limit} OFFSET ${offset}`;
            }
            const queryResult = sql_1.default.SQL_GET_ORDER_BY_USER() + queryOrder;
            database_1.default.query(queryResult, dataSQL, callback);
        });
    }
    static getCountOrderByUserModel(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataSQL = [data.codeUser];
            return database_1.default.query(sql_1.default.SQL_GET_COUNT_ORDER_BY_USER(), dataSQL);
        });
    }
    static getOrderDetailByUser(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataResult = [data.code_user, data.code_order];
            database_1.default.query(sql_1.default.SQL_GET_ORDER_DETAIL_BY_USER(), dataResult, callback);
        });
    }
}
exports.OrderModel = OrderModel;
