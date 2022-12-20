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
exports.NotifyShopModel = void 0;
const database_1 = __importDefault(require("../../../database"));
const Model_1 = __importDefault(require("../../Model"));
const sql_1 = __importDefault(require("../../sql"));
class NotifyShopModel extends Model_1.default {
    static getAllNotifyByShopModel(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql_result = sql_1.default.SQL_GET_ALL_NOTIFY_SHOP();
            if (data.type === 1) {
                sql_result += ` AND type=${data.type} `;
            }
            else if (data.type === 2) {
                sql_result += ` AND type=${data.type} `;
            }
            sql_result += ` LIMIT ($2) `;
            database_1.default.query(sql_result, [data.code_shop, data.limit], callback);
        });
    }
    static getDetailNotifyByShopModel(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query(sql_1.default.SQL_GET_DETAIL_NOTIFY_SHOP(), [data.code_shop, data.code_notify], callback);
        });
    }
}
exports.NotifyShopModel = NotifyShopModel;
