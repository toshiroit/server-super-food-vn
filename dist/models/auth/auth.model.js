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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModel = void 0;
const hash_password_1 = require("./../../libs/hash_password");
const config_1 = __importDefault(require("../../config/config"));
const Model_1 = __importDefault(require("../Model"));
const database_1 = __importDefault(require("../../database"));
const sql_1 = __importDefault(require("../sql"));
const twilio_1 = __importDefault(require("twilio"));
class AuthModel extends Model_1.default {
    static saveCodeModel(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.query(sql_1.default.SQL_SEND_CODE(), [data.code, data.data_hash, true, data.createdAt, data.endTime]);
        });
    }
    static checkCodeModel(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.query(sql_1.default.SQL_CHECK_CODE(), [data.time]);
        });
    }
    static disableCodeModelByCode(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.query(sql_1.default.SQL_DISABLE_CODE(), [data.code]);
        });
    }
    static sendCodeModel(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, twilio_1.default)(config_1.default.twilio_account_sid, config_1.default.twilio_auth_token, {
                lazyLoading: true,
            })
                .messages.create({
                from: config_1.default.twilio_phone,
                to: `+84${data.phone}`,
                body: `Mã kích hoạt tài khoản của bạn : ${data.capCha}`,
            })
                .then(res => {
                return callback(null, res);
            })
                .catch(err => {
                return callback(err, null);
            });
        });
    }
    static checkPhone(valueQuery, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = valueQuery.value;
            database_1.default.query(sql_1.default.SQL_GET_ONE(valueQuery.table, valueQuery.field), data, callback);
        });
    }
    /**
     * Register User
     * @param valueQuery value Query
     * @param callback return callback -> request and response query
     */
    static registerUserModel(valueQuery, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = valueQuery.value;
            database_1.default.query(sql_1.default.SQL_REGISTER_USER_PS(), data, callback);
        });
    }
    static verifyAuthMailerModel(valueQuery, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = valueQuery.value;
            return database_1.default.query(sql_1.default.SQL_GET_ONE_USER_VERIFY_MAILER_CODE(), data, callback);
        });
    }
    static getUserAdminModel(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataResult = [data.user_name];
            return database_1.default.query(sql_1.default.SQL_GET_USER_ADMIN(), dataResult);
        });
    }
    static getUserWModel(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.query(sql_1.default.SQL_GET_USER_W(), [data.code_user]);
        });
    }
    static checkLoginVerificationCode(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataSQL = [data.user_name];
            return database_1.default.query(sql_1.default.SQL_GET_CHECK_VERIFICATION_LOGIN_ADMIN(), dataSQL);
        });
    }
    static getMeShopModel(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataResult = [data.code_user];
            database_1.default.query(sql_1.default.SQL_GET_ME_SHOP(), dataResult, callback);
        });
    }
    static getMeUser(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query(sql_1.default.SQL_GET_ME_USER(), [data.code_user], callback);
        });
    }
    static authUpdatePassword(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query(sql_1.default.SQL_UPDATE_USER_PASSWORD(), [data.password, data.code_user], callback);
        });
    }
    static authRestPassword(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query(sql_1.default.SQL_UPDATE_USER_NEW_PASSWORD(), [data.password, data.phone], callback);
        });
    }
    static sendNewPassModel(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, twilio_1.default)(config_1.default.twilio_account_sid, config_1.default.twilio_auth_token, {
                lazyLoading: true,
            })
                .messages.create({
                from: config_1.default.twilio_phone,
                to: `+84${data.phone}`,
                body: `Mật khẩu mới của bạn là : ${data.new_password}`,
            })
                .then(res => {
                return callback(null, res);
            })
                .catch(err => {
                return callback(err, null);
            });
        });
    }
}
exports.AuthModel = AuthModel;
_a = AuthModel;
AuthModel.updateRefreshToken = (data) => __awaiter(void 0, void 0, void 0, function* () {
    database_1.default.query(sql_1.default.SQL_UPDATE_REFRESH_TOKEN_USER(), data);
});
AuthModel.loginUserModel = (valueQuery, callback) => __awaiter(void 0, void 0, void 0, function* () {
    let result = null;
    result = yield database_1.default.query(sql_1.default.SQL_LOGIN_USER_FULL(), [valueQuery.value.phone]);
    if (result.rows.length > 0 && result.rows.length) {
        const { password: hasPassword } = result.rows[0];
        const isPassword = (0, hash_password_1.comparePassword)(valueQuery.value.password, hasPassword.trim());
        const error = {
            message: 'Tài khoản hoặc mật khẩu không chính xác ',
            name: 'error login',
            status: 401,
        };
        if (isPassword) {
            database_1.default.query(sql_1.default.SQL_GET_USER_PHONE(), [valueQuery.value.phone], callback);
        }
        else {
            callback(null, null);
        }
    }
    else {
        const data = [
            valueQuery.value.code_user,
            valueQuery.value.hashPassword,
            'ROLE-WIXO-USER',
            valueQuery.value.phone,
            new Date(Date.now()).toISOString(),
            false,
        ];
        const dataReg = [
            valueQuery.value.code_user,
            valueQuery.value.code_user_detail,
            valueQuery.value.hashPassword,
            'ROLE-WIXO-USER',
            valueQuery.value.phone,
            new Date(Date.now()).toISOString(),
            1,
            valueQuery.value.verification_code,
            valueQuery.value.full_name,
            valueQuery.value.sex,
            valueQuery.value.code_restpass,
            valueQuery.value.createdAtDetail,
            valueQuery.value.email,
        ];
        const valueQueryRegister = {
            table: 'user_sp',
            obj: {
                condition: null,
            },
            field: null,
            value: dataReg,
        };
        _a.registerUserModel(valueQueryRegister, (err, result) => {
            callback(err, result);
        });
    }
});
