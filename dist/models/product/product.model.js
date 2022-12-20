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
exports.ProductModel = void 0;
const config_1 = __importDefault(require("../../config/config"));
const database_1 = __importDefault(require("../../database"));
const getPagination_1 = require("../../libs/getPagination");
const nonAccentVietnamese_1 = require("../../libs/nonAccentVietnamese");
const Model_1 = __importDefault(require("../Model"));
const sql_1 = __importDefault(require("../sql"));
class ProductModel extends Model_1.default {
    /*
     * @params {data} data code and name
     */
    static getAllProductModel(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            let queryGetProduct = ' WHERE is_show=1 and pd.date_end >= now() ';
            if (data) {
                if (data.typeSort === 'new-product') {
                    queryGetProduct += ` ORDER BY pd."createdAt" DESC `;
                }
                else if (data.typeSort === 'shop-new') {
                    queryGetProduct += ``;
                }
                else if (data.typeSort === 'pay-top') {
                    queryGetProduct += ` ORDER BY pd.purchase DESC `;
                }
                else if (data.typeSort === 'evaluate') {
                    queryGetProduct += ` ORDER BY p.evaluate `;
                }
            }
            if (data.limit != null) {
                queryGetProduct += ` LIMIT ${data.limit} `;
            }
            const sqlResult = sql_1.default.SQL_GET_PRODUCT_ALL() + queryGetProduct;
            database_1.default.query(sqlResult, callback);
        });
    }
    static getProductDetailModel(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataGet = [data.code, `%${data.name}%`];
            database_1.default.query(sql_1.default.SQL_GET_PRODUCT_BY_NAME_OR_CODE(), dataGet, callback);
        });
    }
    static getCountProduct(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let queryCount = '';
            const dataQ = [];
            if (data.q) {
                queryCount += ` where convertTVkdau(p.name) like ($1) 
      and pd.is_show=1 
      and pd.date_end IS NULL 
      or pd.date_end is NOT null and pd.date_end < now()
      `;
                dataQ.push(`%${data.q}%`);
            }
            const resultSQL = sql_1.default.SQL_GET_COUNT_PRODUCT() + queryCount;
            return database_1.default.query(resultSQL, dataQ);
        });
    }
    static getAllProductByShopModel(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            let querySearch = '';
            const dataQuery = [data.code_shop];
            if (data.limit) {
                querySearch += ` LIMIT ${data.limit}`;
            }
            const queryResult = sql_1.default.SQL_GET_PRODUCT_BY_SHOP() + querySearch;
            database_1.default.query(queryResult, dataQuery, callback);
        });
    }
    static getAllProductByTopModel(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            let querySearch = '';
            if (data.limit) {
                querySearch += ` LIMIT ${data.limit}`;
            }
            const queryResult = sql_1.default.SQL_GET_PRODUCT_BY_TOP() + querySearch;
            database_1.default.query(queryResult, callback);
        });
    }
    static getAllProductByPayTop(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            let querySearch = '';
            if (data.limit) {
                querySearch += ` LIMIT ${data.limit}`;
            }
            const queryResult = sql_1.default.SQL_GET_PRODUCT_BY_PAY_TOP() + querySearch;
            database_1.default.query(queryResult, callback);
        });
    }
    static getAllProductByNewShop(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            let querySearch = '  ';
            if (data.limit) {
                querySearch += ` LIMIT ${data.limit}`;
            }
            const queryResult = sql_1.default.SQL_GET_PRODUCT_BY_NEW_SHOP() + querySearch;
            database_1.default.query(queryResult, callback);
        });
    }
    static getProductByQueryModel(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const { limit, offset } = (0, getPagination_1.getPagination)(Number(data.page || 1), Number(config_1.default.search_product_limit_show));
            let querySearch = '';
            const dataSql = [];
            if (data.q) {
                querySearch += ' where convertTVkdau(p.name) ilike ($1) and ';
                dataSql.push(`%${(0, nonAccentVietnamese_1.toLowerCaseNonAccentVietnamese)(data.q)}%`);
            }
            querySearch += ` 
     pd.is_show=1 
    and pd.date_end IS NULL 
    or pd.date_end is NOT null and pd.date_end < now() `;
            if (data.sort || data.type_show) {
                if (data.sort === 0) {
                    querySearch += ` ORDER BY p."name" DESC `;
                }
                else if (data.sort === 1) {
                    querySearch += ` ORDER BY p."name" ASC `;
                }
                else if (data.sort === 2) {
                    querySearch += ` ORDER BY (p.price - (price * (pd.discount::decimal/100))) ASC `;
                }
                else if (data.sort === 3) {
                    querySearch += ` ORDER BY  (p.price - (price * (pd.discount::decimal/100))) DESC `;
                }
                else if (data.type_show === 0) {
                    querySearch += ` ORDER BY p.evaluate DESC `;
                }
                else if (data.type_show === 1) {
                    querySearch += ` ORDER BY pd.purchase `;
                }
            }
            if (limit !== null && offset !== null) {
                querySearch += ` LIMIT ${limit} OFFSET ${offset}`;
            }
            const queryResult = sql_1.default.SQL_GET_PRODUCT_BY_QUERY() + querySearch;
            //queryResult = queryResult
            return database_1.default.query(queryResult, dataSql, callback);
        });
    }
    static getAllTypeProductByShopModel(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query(sql_1.default.SQL_GET_ALL_PRODUCT_TYPE(), [data.code_shop], callback);
        });
    }
    static getCountEvaluate5Model(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.query(sql_1.default.SQL_GET_EVALUATE_PRODUCT_5(), [data.code_product]);
        });
    }
}
exports.ProductModel = ProductModel;
