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
const database_1 = __importDefault(require("../database"));
const sql_1 = __importDefault(require("./sql"));
class Model {
}
_a = Model;
Model.getOne = (value, callback) => __awaiter(void 0, void 0, void 0, function* () {
    database_1.default.query(sql_1.default.SQL_GET_ONE(value.table, value.field), [18], (err, result) => {
        return callback(err, result);
    });
});
Model.addData = (value, callback) => __awaiter(void 0, void 0, void 0, function* () {
    database_1.default.query(sql_1.default.SQL_INSERT_DATA(value.table), [value.value], (err, result) => callback(err, result));
});
Model.updateData = (value, callback) => __awaiter(void 0, void 0, void 0, function* () {
    database_1.default.query(sql_1.default.SQL_UPDATE_DATA(value.table, value.condition), [value.obj, value.obj.condition], (err, result) => callback(err, result));
});
Model.deleteData = (value, callback) => __awaiter(void 0, void 0, void 0, function* () {
    database_1.default.query(sql_1.default.SQL_DELETE_DATA(value.table, value.condition), [value.value], (err, result) => callback(err, result));
});
Model.getAll = (value, callback) => __awaiter(void 0, void 0, void 0, function* () {
    database_1.default.query(sql_1.default.SQL_GET_ALL(value.table, value.field), (err, result) => callback(err, result));
});
Model.getAllNoField = (value, callback) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.default.query(sql_1.default.SQL_GET_ALL_NO_FIELD(value.table, value.field), (err, result) => {
        return callback(err, result);
    });
});
Model.getPaginateList = (value, callback) => __awaiter(void 0, void 0, void 0, function* () {
    const page_size = 10;
    const skip = (value.page - 1) * page_size;
    if (value.value2 === -1 && (value.field2 === '' || value.field2 === null)) {
        database_1.default.query(sql_1.default.SQL_GET_PAGINATE_LIST_2(value.table), [value.field, value.value, value.order_field, page_size, skip], (err, result) => callback(err, result));
    }
    else {
        database_1.default.query(sql_1.default.SQL_GET_PAGINATE_LIST_2(value.table), [value.field, value.value, value.field2, page_size, skip], (err, result) => callback(err, result));
    }
});
exports.default = Model;
