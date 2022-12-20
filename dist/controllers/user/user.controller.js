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
exports.updateUser = exports.updatePassword = void 0;
const data_user_1 = require("../../libs/data_user");
const user_model_1 = __importDefault(require("../../models/user/user.model"));
const updatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line no-empty
    try {
    }
    catch (error) {
        res.json({
            error,
        });
    }
});
exports.updatePassword = updatePassword;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data_user = yield (0, data_user_1.dataUserTK)(req);
        const data = {
            full_name: req.body.full_name,
            date: req.body.date,
            avatar: req.body.avatar,
            sex: req.body.sex,
            code_user: data_user === null || data_user === void 0 ? void 0 : data_user.payload.code_user,
        };
        yield user_model_1.default.updateUserW1(data, (err, result) => {
            if (err) {
                res.json({
                    error: err,
                });
            }
            else {
                if (result) {
                    if (result.rowCount === 1) {
                        res.json({
                            command: result.command,
                            message: 'Cập nhật thành công',
                        });
                    }
                    else {
                        res.json({
                            command: result.command,
                            message: 'Cập nhật không thành công',
                        });
                    }
                }
            }
        });
    }
    catch (err) {
        res.json({
            error: 'Error',
        });
    }
});
exports.updateUser = updateUser;
