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
exports.CartModel = void 0;
const database_1 = __importDefault(require("../../database"));
const pg_format_1 = __importDefault(require("pg-format"));
const Model_1 = __importDefault(require("../Model"));
const sql_1 = __importDefault(require("../sql"));
class CartModel extends Model_1.default {
    static getCartModel(code_user, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query(sql_1.default.SQL_GET_CART_BY_CODE_USER(), [code_user], callback);
        });
    }
    static addCartByCodeUserModel(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataCartArr = data.value;
            const dataResult = [];
            const time = new Date().toISOString();
            let i = 0;
            if (dataCartArr[0].length > 1) {
                while (i < dataCartArr[0].length) {
                    dataCartArr[0][i].code_user = dataCartArr[1];
                    dataCartArr[0][i].createdat = time;
                    dataResult.push([
                        dataCartArr[0][i].code_cart,
                        dataCartArr[0][i].code_user,
                        dataCartArr[0][i].code_product,
                        dataCartArr[0][i].quality_product,
                        dataCartArr[0][i].createdat,
                    ]);
                    i++;
                }
                const formatQuery = (0, pg_format_1.default)(`INSERT INTO cart_sp (code_cart,code_user,code_product,quality_product,createdat)
         VALUES %L on conflict (code_cart)
         DO UPDATE SET quality_product=EXCLUDED.quality_product,createdat=EXCLUDED.createdat`, dataResult);
                database_1.default.query(formatQuery, [], callback);
            }
            else {
                const dataFW = [
                    dataCartArr[0][0].code_cart,
                    dataCartArr[1],
                    dataCartArr[0][0].code_product,
                    dataCartArr[0][0].quality_product,
                    time,
                ];
                const formatQuery = (0, pg_format_1.default)(`INSERT INTO cart_sp (code_cart,code_user,code_product,quality_product,createdat)
         VALUES (%L) on conflict (code_cart)
         DO UPDATE SET quality_product=EXCLUDED.quality_product,createdat=EXCLUDED.createdat`, dataFW);
                database_1.default.query(formatQuery, [], callback);
            }
        });
    }
    static updateCartByCodeUserModel(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataCartArr = data.value;
            const dataResult = [];
            const time = new Date().toISOString();
            let i = 0;
            if (dataCartArr[0].length > 1) {
                while (i < dataCartArr[0].length) {
                    dataCartArr[0][i].code_user = dataCartArr[1];
                    dataCartArr[0][i].createdat = time;
                    dataResult.push([
                        dataCartArr[0][i].code_cart,
                        dataCartArr[0][i].code_user,
                        dataCartArr[0][i].code_product,
                        dataCartArr[0][i].quality_product,
                        dataCartArr[0][i].createdat,
                    ]);
                    i++;
                }
                database_1.default.query(sql_1.default.SQL_UPDATE_CART_BY_CODE_USER(), dataResult, callback);
            }
            else {
                const dataFW = [
                    dataCartArr[0][0].code_cart,
                    dataCartArr[1],
                    dataCartArr[0][0].code_product,
                    dataCartArr[0][0].quality_product,
                    time,
                ];
                database_1.default.query(sql_1.default.SQL_UPDATE_CART_BY_CODE_USER(), dataFW, callback);
            }
        });
    }
    static removeCartByCodeCartModel(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataQuery = data.value;
            database_1.default.query(sql_1.default.SQL_REMOVE_CART_BY_CODE_CART_AND_USER(), dataQuery, callback);
        });
    }
}
exports.CartModel = CartModel;
