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
exports.AddressModel = void 0;
const database_1 = __importDefault(require("../../database"));
const make_id_1 = require("../../libs/make_id");
const Model_1 = __importDefault(require("../Model"));
const sql_1 = __importDefault(require("../sql"));
class AddressModel extends Model_1.default {
    static addAddressByUserModel(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataSQL = [
                (0, make_id_1.makeId)(15),
                data.item.data.code_user,
                data.item.data.full_name,
                data.item.data.phone,
                data.item.data.detail_address,
                data.item.data.status,
                (0, make_id_1.makeId)(15),
                data.item.data.email,
                data.item.data.street,
                data.item.data.village,
                data.item.data.district,
                data.item.data.city,
            ];
            database_1.default.query(sql_1.default.SQL_INSERT_ADDRESS_BY_USER(), dataSQL, callback);
        });
    }
    static updateStatusAddressByUserModel(data) {
        return database_1.default.query(sql_1.default.SQL_UPDATE_STATUS_ADDRESS_BY_USER(), [data.status, data.code_user, data.code_address]);
    }
    static checkPhoneAddressIsEmptyByUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.query(sql_1.default.SQL_CHECK_ADDRESS_PHONE_IS_EMPTY_BY_USER(), [data.phone, data.code_user]);
        });
    }
    static checkCountAddressByUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.query(sql_1.default.SQL_CHECK_COUNT_ADDRESS_BY_USER(), [data.code_user]);
        });
    }
    static getDetailAddressUserByCode(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query(sql_1.default.SQL_GET_DETAIL_ADDRESS_USER_BY_CODE(), [data.code_address, data.code_user], callback);
        });
    }
    static updateAddressUserByCodeModel(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataSQL = [
                data.data.code_address,
                data.data.code_user,
                data.data.full_name,
                data.data.phone,
                data.data.detail_address,
                data.data.status,
                data.data.email,
                data.data.street,
                data.data.village,
                data.data.district,
                data.data.city,
            ];
            database_1.default.query(sql_1.default.SQL_UPDATE_ADDRESS_USER_BY_CODE(), dataSQL, callback);
        });
    }
}
exports.AddressModel = AddressModel;
_a = AddressModel;
AddressModel.getAddressByUserModel = (data, callback) => __awaiter(void 0, void 0, void 0, function* () {
    const dataResult = [data.code_user];
    database_1.default.query(sql_1.default.SQL_GET_ADDRESS_BY_USER(), dataResult, callback);
});
