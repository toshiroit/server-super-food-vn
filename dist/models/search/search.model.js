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
const database_1 = __importDefault(require("../../database"));
const nonAccentVietnamese_1 = require("../../libs/nonAccentVietnamese");
const Model_1 = __importDefault(require("../Model"));
const sql_1 = __importDefault(require("../sql"));
class SearchModel extends Model_1.default {
    static getListTextSearchProduct(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let sqlResult = sql_1.default.SQL_GET_NAME_PRODUCT_BY_TEXT();
            sqlResult += ` where converttvkdau(p.name) ilike '%${(0, nonAccentVietnamese_1.toLowerCaseNonAccentVietnamese)(data.text)}%' ORDER BY p.evaluate DESC LIMIT 7 `;
            return database_1.default.query(sqlResult, []);
        });
    }
}
exports.SearchModel = SearchModel;
