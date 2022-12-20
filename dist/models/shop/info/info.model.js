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
exports.InfoShopModel = void 0;
const database_1 = __importDefault(require("../../../database"));
const getPagination_1 = require("../../../libs/getPagination");
const make_id_1 = require("../../../libs/make_id");
const nonAccentVietnamese_1 = require("../../../libs/nonAccentVietnamese");
const Model_1 = __importDefault(require("../../Model"));
const sql_1 = __importDefault(require("../../sql"));
class InfoShopModel extends Model_1.default {
    static getDetailShopInfoByCodeShop(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query(sql_1.default.SQL_GET_DETAIL_SHOP(), [data.code_shop.trim(), data.code_user ? data.code_user.trim() : null], callback);
        });
    }
    static getCountAllProductShopModel(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataResult = [data.code_shop];
            let querySearch = '';
            if (data.q) {
                querySearch += ` AND converttvkdau(p.name) ilike '%${(0, nonAccentVietnamese_1.toLowerCaseNonAccentVietnamese)(data.q)}%' `;
                querySearch += ` OR p.code_product='${data.q}' `;
            }
            const queryResult = sql_1.default.SQL_GET_COUNT_PRODUCT_BY_SHOP() + querySearch;
            return database_1.default.query(queryResult, dataResult);
        });
    }
    static getAllCategoryProductShopModel(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let querySearch = '';
            if (data.q) {
                querySearch += ` AND converttvkdau(p.name) ilike '%${(0, nonAccentVietnamese_1.toLowerCaseNonAccentVietnamese)(data.q)}%' `;
                querySearch += ` OR p.code_product='${data.q}' `;
            }
            if (data.type) {
                if (data.type === 'top-pay') {
                    querySearch += ' ORDER BY pd.purchase DESC ';
                }
                else if (data.type === 'new') {
                    querySearch += ' ORDER BY pd."createdAt" DESC ';
                }
                else {
                    querySearch += ' ';
                }
            }
            const queryResult = sql_1.default.SQL_GET_ALL_CATEGORY_BY_PRODUCT_SHOP() + querySearch;
            return database_1.default.query(queryResult, [data.code_shop]);
        });
    }
    static getAllProductShopModel(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            let querySearch = '';
            const { offset, limit } = (0, getPagination_1.getPagination)(data.page, 20);
            if (data.q) {
                querySearch += ` AND converttvkdau(p.name) ilike '%${(0, nonAccentVietnamese_1.toLowerCaseNonAccentVietnamese)(data.q)}%' `;
                querySearch += ` OR p.code_product='${data.q}' `;
            }
            if (data.type) {
                if (data.type === 'top-pay') {
                    querySearch += ' ORDER BY pd.purchase DESC ';
                }
                else if (data.type === 'new') {
                    querySearch += ' ORDER BY pd."createdAt" DESC ';
                }
                else {
                    querySearch += ' ';
                }
            }
            const dataResult = [data.code_shop];
            querySearch += ` LIMIT 20 OFFSET ${offset} `;
            const queryResult = sql_1.default.SQL_GET_PRODUCT_BY_SHOP() + querySearch;
            database_1.default.query(queryResult, dataResult, callback);
        });
    }
    static getAllCategoryProductShopModel2(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.query(sql_1.default.SQL_GET_ALL_CATEGORY_PRODUCT_BY_SHOP(), [data.code_shop]);
        });
    }
    static followShopByUserModel(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const sqlFollow = `
    INSERT INTO follow_shop_sp(
	    code_follow, code_user, code_shop
    )
	  SELECT '${(0, make_id_1.makeId)(15)}','${data.code_user.trim()}','${data.code_shop.trim()}'
		  WHERE NOT EXISTS(
		  SELECT code_follow,code_user,code_shop
		  FROM follow_shop_sp
		  WHERE follow_shop_sp.code_user='${data.code_user.trim()}' and follow_shop_sp.code_shop='${data.code_shop.trim()}'
    )
    `;
            database_1.default.query(sqlFollow, [], callback);
        });
    }
    static disableFollowShopByUserModel(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query(sql_1.default.SQL_DISABLE_FOLLOW_SHOP_BY_USER(), [data.code_user, data.code_shop], callback);
        });
    }
    static getAllCategoryShopModel(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query(sql_1.default.SQL_GET_ALL_CATEGORY_BY_SHOP(), [data.code_shop], callback);
        });
    }
}
exports.InfoShopModel = InfoShopModel;
