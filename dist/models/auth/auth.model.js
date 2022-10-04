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
const hash_password_1 = require("./../../libs/hash_password");
const Model_1 = __importDefault(require("../Model"));
const database_1 = __importDefault(require("../../database"));
const sql_1 = __importDefault(require("../sql"));
const get_fields_object_1 = require("../../libs/get_fields_object");
const get_values_object_1 = require("../../libs/get_values_object");
class AuthModel extends Model_1.default {
    static authenticateModel(valueQuery, callback) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    static loginUserModel(valueQuery, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = valueQuery.value;
            const dataLogin = [data.phone, data.username];
            console.log('=>', dataLogin);
            let result = null;
            if (data.phone && data.username) {
                result = yield database_1.default.query(sql_1.default.SQL_LOGIN_USER_FULL(), dataLogin);
            }
            else {
                result = yield database_1.default.query(sql_1.default.SQL_LOGIN_USER('users'), dataLogin);
            }
            if (result.rows.length || result.rows.length > 0) {
                const { password: hasPassword } = result.rows[0];
                const isPassword = (0, hash_password_1.comparePassword)(data.passwordConfirmation, hasPassword);
                if (isPassword) {
                    if (data.phone && data.username) {
                        return database_1.default.query(sql_1.default.SQL_LOGIN_USER_FULL(), dataLogin, callback);
                    }
                    else if (!data.phone && data.username) {
                        return database_1.default.query(sql_1.default.SQL_GET_USER_USER_NAME(), [data.username], callback);
                    }
                    else if (data.phone && !data.username) {
                        return database_1.default.query(sql_1.default.SQL_GET_USER_PHONE(), [data.phone], callback);
                    }
                    else {
                        return callback(null, null);
                    }
                }
                else {
                    return callback(null, null);
                }
            }
            else {
                return callback(null, null);
            }
        });
    }
    /**
     * Register User
     * @param valueQuery value Query
     * @param callback return callback -> request and response query
     */
    static registerUserModel(valueQuery, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const field = (0, get_fields_object_1.getDataObjectFields)(valueQuery.value);
            const value = (0, get_values_object_1.getDataObjectValues)(valueQuery.value);
            try {
                database_1.default.query(sql_1.default.SQL_INSERT_DATA_PS(valueQuery.table, field, value), callback);
                //console.log(SqlRoot.SQL_INSERT_DATA_PS(valueQuery.table, field, value));
            }
            catch (error) { }
        });
    }
    static verifyAuthMailerModel(valueQuery, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = valueQuery.value;
            return database_1.default.query(sql_1.default.SQL_GET_ONE_USER_VERIFY_MAILER_CODE(), data, callback);
        });
    }
}
exports.AuthModel = AuthModel;
