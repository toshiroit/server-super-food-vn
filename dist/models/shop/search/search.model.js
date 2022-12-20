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
exports.SearchModel = void 0;
const database_1 = __importDefault(require("../../../database"));
const Model_1 = __importDefault(require("../../Model"));
const sql_1 = __importDefault(require("../../sql"));
class SearchModel extends Model_1.default {
    static getShopModelByNameAndCode(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql_result = sql_1.default.SQL_GET_SHOP_BY_NAME_OR_CODE();
            console.log('DATA : ', data.name_shop, '---', data.code_shop);
            sql_result += ` where
	      converttvkdau(s.name_shop) ilike '%${data.name_shop}%' OR s.code_shop='${data.code_shop}'`;
            database_1.default.query(sql_result, [], callback);
        });
    }
    static getCountShopModelByNameAndCode(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql_result = sql_1.default.SQL_GET_COUNT_SHOP_NAME_PRODUCT_BY_TEXT();
            sql_result += ` where
	      converttvkdau(s.name_shop) ilike '%${data.name_shop}%' OR s.code_shop='${data.code_shop}'`;
            return database_1.default.query(sql_result, []);
        });
    }
}
exports.SearchModel = SearchModel;
