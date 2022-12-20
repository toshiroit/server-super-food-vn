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
exports.CategoryModel = void 0;
const database_1 = __importDefault(require("../../../database"));
const nonAccentVietnamese_1 = require("../../../libs/nonAccentVietnamese");
const Model_1 = __importDefault(require("../../Model"));
const sql_1 = __importDefault(require("../../sql"));
class CategoryModel extends Model_1.default {
    static checkNameCategoryShopModel(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.query(sql_1.default.SQL_CHECK_NAME_CATEGORY_BY_SHOP(), [(0, nonAccentVietnamese_1.toLowerCaseNonAccentVietnamese)(data.name_category), data.code_shop]);
        });
    }
    static removeCategoryShopModel(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query(sql_1.default.SQL_REMOVE_CATEGORY_BY_SHOP(), [data.category_code, data.code_shop], callback);
        });
    }
    static getCategoryProductShopModel(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataSQL = [data.code_shop];
            database_1.default.query(sql_1.default.SQL_GET_CATEGORY_PRODUCT_BY_SHOP(), dataSQL, callback);
        });
    }
    static getAllCategoryByShopModel(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query(sql_1.default.SQL_GET_ALL_CATEGORY_BY_SHOP(), [data.code_shop.trim()], callback);
        });
    }
    static addNewCategoryByShopModel(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataSQL = [data.category_code, data.name_category, data.image, data.info_category, data.status_category, data.code_shop];
            database_1.default.query(sql_1.default.SQL_ADD_CATEGORY_BY_SHOP(), dataSQL, callback);
        });
    }
    static updateCategoryByShopModel(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataSQL = [data.category_code, data.code_shop, data.name_category, data.image, data.info_category, data.status_category];
            database_1.default.query(sql_1.default.SQL_UPDATE_CATEGORY_BY_SHOP(), dataSQL, callback);
        });
    }
}
exports.CategoryModel = CategoryModel;
