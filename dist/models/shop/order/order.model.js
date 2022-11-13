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
            database_1.default.query(sql_1.default.SQL_GET_ALL_ORDER_BY_SHOP(), [data.code_shop], callback);
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
}
exports.OrderModel = OrderModel;
