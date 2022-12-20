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
exports.AuthModel = void 0;
const database_1 = __importDefault(require("../../../database"));
const Model_1 = __importDefault(require("../../Model"));
const sql_1 = __importDefault(require("../../sql"));
class AuthModel extends Model_1.default {
    static authCheckUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.query(sql_1.default.SQL_CHECK_USER_REGISTER(), [data.user_name, data.phone]);
        });
    }
    static authRegisterModel(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query(sql_1.default.SQL_REGISTER_SHOP(), data, callback);
        });
    }
    static authCheckVerificationCode(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.query(sql_1.default.SQL_AUTH_CHECK_VERIFICATION_BY_USER(), [data.user_name, data.verification_code]);
        });
    }
    static authIsCheckVerification(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.query(sql_1.default.SQL_AUTH_IS_VERIFICATION_BY_USER(), [data.user_name, data.verification_code]);
        });
    }
    static authActiveAccountShopByUser(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query(sql_1.default.SQL_ACTIVE_ACCOUNT_SHOP_BY_USER(), [data.user_name], callback);
        });
    }
    static authGetVerificationCodeByUserName(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.query(sql_1.default.SQL_AUTH_GET_VERIFICATION_ACCOUNT_BY_USER_NAME(), [data.user_name]);
        });
    }
    static authCheckPasswordByShop(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query(sql_1.default.SQL_GET_DATA_USER_BY_CODE_USER_SHOP(), [data.code_shop, data.user_name], callback);
        });
    }
    static authUpdateUserByShopModel(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataSQL = [
                data.code_shop,
                data.avatar,
                data.name_shop,
                data.full_name,
                data.email,
                data.phone,
                data.facebook,
                data.background_shop,
                data.description,
                data.youtube,
            ];
            console.log(dataSQL);
            database_1.default.query(sql_1.default.SQL_AUTH_UPDATE_USER_SHOP_BY_CODE(), dataSQL, callback);
        });
    }
}
exports.AuthModel = AuthModel;
