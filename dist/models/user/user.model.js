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
const database_1 = __importDefault(require("../../database"));
const Model_1 = __importDefault(require("../Model"));
const sql_1 = __importDefault(require("../sql"));
class UserModel extends Model_1.default {
    constructor() {
        super(...arguments);
        this.model = new Model_1.default();
    }
    createUser(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `INSERT INTO users (email,user_name,first_name,last_name,password)
      values ($1,$2,$3,$4,$5) returning *`;
                const result = yield database_1.default.query(sql, [u.email, u.user_name, u.first_name, u.last_name, u.password]);
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Unable to create (${u.user_name}): ${error.message}`);
            }
        });
    }
    static updateUserW1(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            //const resultData = [data.fullName, data.sex, data.date, code_user_detail_ds];
            const dataSQL = [data.avatar, data.code_user, data.full_name, data.sex, data.date];
            database_1.default.query(sql_1.default.SQL_UPDATE_USER_W1(), dataSQL, callback);
        });
    }
}
exports.default = UserModel;
