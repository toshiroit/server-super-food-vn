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
exports.ProductShopModel = void 0;
const config_1 = __importDefault(require("../../../config/config"));
const database_1 = __importDefault(require("../../../database"));
const getPagination_1 = require("../../../libs/getPagination");
const nonAccentVietnamese_1 = require("../../../libs/nonAccentVietnamese");
const Model_1 = __importDefault(require("../../Model"));
const sql_1 = __importDefault(require("../../sql"));
class ProductShopModel extends Model_1.default {
    static getCountAllProductShopModel(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataResult = [data.code_shop];
            let sql_result = sql_1.default.SQL_GET_COUNT_PRODUCT_BY_SHOP();
            if (data.q && data.q.length > 0) {
                sql_result += ` AND converttvkdau(p.name) ilike '%${(0, nonAccentVietnamese_1.toLowerCaseNonAccentVietnamese)(data.q)}%'  OR p.code_product='${data.q}' `;
            }
            if (data.code_category) {
                // sql_result += ` and jsonb_array_elements.value ->>'code' IN ('${data.code_category}')`;
            }
            if (data.price_min && data.price_min >= 1000 && data.price_max) {
                sql_result += ` and p.price BETWEEN ${data.price_min} AND ${data.price_max} `;
            }
            if (data.code_product_type) {
                sql_result += ` AND p.code_product_type='${data.code_product_type}' `;
            }
            if (data.type_filter === 'ALL') {
                sql_result += ` `;
            }
            else if (data.type_filter === 'SELL') {
                sql_result += ` `;
            }
            else if (data.type_filter === 'BLOCK') {
                sql_result += ` AND pd.is_show=-2 `;
            }
            else if (data.type_filter === 'HIDE') {
                sql_result += ` AND pd.is_show=-1 `;
            }
            return database_1.default.query(sql_result, dataResult);
        });
    }
    static getAllProductShopModel(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            let querySearch = '';
            const { offset, limit } = (0, getPagination_1.getPagination)(data.page || 1, Number(config_1.default.table_product_shop_limit_show));
            if (data.q) {
                querySearch += ` AND converttvkdau(p.name) ilike '%${(0, nonAccentVietnamese_1.toLowerCaseNonAccentVietnamese)(data.q)}%' `;
                querySearch += ` OR p.code_product='${data.q}' `;
            }
            if (data.code_product_type) {
                querySearch += `  AND p.code_product_type='${data.code_product_type}' `;
            }
            if (data.code_category) {
                // querySearch += ` and jsonb_array_elements.value ->>'code' IN ('${data.code_category}')`;
            }
            if (data.type_filter === 'ALL') {
                querySearch += ` `;
            }
            else if (data.type_filter === 'SELL') {
                querySearch += ` `;
            }
            else if (data.type_filter === 'BLOCK') {
                querySearch += ` AND pd.is_show=-2 `;
            }
            else if (data.type_filter === 'HIDE') {
                querySearch += ` AND pd.is_show=-1 `;
            }
            if (data.price_min && data.price_min >= 0 && data.price_max && data.price_max !== 0) {
                querySearch += ` and p.price BETWEEN ${data.price_min} AND ${data.price_max} `;
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
            querySearch += ` LIMIT ${Number(config_1.default.table_product_shop_limit_show) || 10} OFFSET ${offset} `;
            const queryResult = sql_1.default.SQL_GET_PRODUCT_BY_SHOP() + querySearch;
            database_1.default.query(queryResult, dataResult, callback);
        });
    }
    static addProductShopModel(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query(sql_1.default.SQL_ADD_PRODUCT_BY_SHOP(), data, callback);
        });
    }
    static getProductByCodeAndShopModel(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataQuery = [data.code_shop, data.code_product];
            database_1.default.query(sql_1.default.SQL_GET_PRODUCT_BY_CODE_AND_SHOP(), dataQuery, callback);
        });
    }
    static addTypeProductModel(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataSQL = [data.code_product_type, data.name_product_type, data.status, data.code_shop];
            database_1.default.query(sql_1.default.SQL_ADD_TYPE_PRODUCT(), dataSQL, callback);
        });
    }
    static removeProductByShop(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataSQL = [data.code_product, data.code_shop];
            database_1.default.query(sql_1.default.SQL_REMOVE_PRODUCT_BY_SHOP(), dataSQL, callback);
        });
    }
    static searchProductByValueAndShop(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataSQL = [data.code_shop, data.value];
            database_1.default.query(sql_1.default.SQL_SEARCH_PRODUCT_BY_SHOP(), dataSQL, callback);
        });
    }
    static getCountSearchByValueAndShop(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataSQL = [data.code_shop, data.value];
            return database_1.default.query(sql_1.default.SQL_GET_COUNT_SEARCH_PRODUCT_BY_SHOP(), dataSQL);
        });
    }
    static updateProductByCodeAndShop(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query(sql_1.default.SQL_UPDATE_PRODUCT_BY_CODE_AND_SHOP(), data, callback);
        });
    }
}
exports.ProductShopModel = ProductShopModel;
