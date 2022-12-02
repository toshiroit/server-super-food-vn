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
exports.EvaluateModel = void 0;
const database_1 = __importDefault(require("../../database"));
const Model_1 = __importDefault(require("../Model"));
const sql_1 = __importDefault(require("../sql"));
class EvaluateModel extends Model_1.default {
    static addEvaluateByProductModel(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataSQL = [
                data.code_evaluate,
                data.code_user,
                data.code_product,
                data.evaluate_product,
                data.evaluate_ship,
                data.evaluate_progress,
                data.images,
                data.text,
                data.createdAt,
                data.code_order,
            ];
            database_1.default.query(sql_1.default.SQL_ADD_EVALUATE_BY_PRODUCT(), dataSQL, callback);
        });
    }
    static checkEvaluateByProductUserOrderModel(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.query(sql_1.default.SQL_CHECK_EVALUATE_BY_PRODUCT_USER_ORDER(), [data.code_user, data.code_product, data.code_order]);
        });
    }
}
exports.EvaluateModel = EvaluateModel;
