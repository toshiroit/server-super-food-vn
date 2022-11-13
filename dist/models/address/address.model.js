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
const Model_1 = __importDefault(require("../Model"));
const sql_1 = __importDefault(require("../sql"));
class AddressModel extends Model_1.default {
}
exports.AddressModel = AddressModel;
_a = AddressModel;
AddressModel.getAddressByUserModel = (data, callback) => __awaiter(void 0, void 0, void 0, function* () {
    const dataResult = [data.code_user];
    database_1.default.query(sql_1.default.SQL_GET_ADDRESS_BY_USER(), dataResult, callback);
});
