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
exports.updateUser = void 0;
const config_1 = __importDefault(require("../../config/config"));
const user_model_1 = __importDefault(require("../../models/user/user.model"));
const jwt_token_1 = require("../../utils/jwt/jwt-token");
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cookie } = req.headers;
        const bearer = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[0].toLowerCase();
        const token = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[1];
        let dataUser = null;
        if (token && bearer === 'jwt') {
            dataUser = (0, jwt_token_1.verifyJWT)(token, config_1.default.refresh_token_secret);
            delete dataUser.payload.password;
            delete dataUser.payload.verification_code;
            delete dataUser.payload.passwordResetCode;
        }
        const data = {
            fullName: req.body.fullName,
            sex: req.body.sex,
            date: req.body.date,
            dataUserLogin: dataUser
        };
        yield user_model_1.default.updateUserW1(data, (err, result) => {
            if (err) {
                res.json({
                    error: err
                });
            }
            else {
                if (result) {
                    if (result.rowCount === 1) {
                        res.json({
                            command: result.command,
                            message: "Cập nhật thành công"
                        });
                    }
                    else {
                        res.json({
                            command: result.command,
                            message: "Cập nhật không thành công"
                        });
                    }
                }
            }
        });
    }
    catch (err) {
        res.json({
            error: "Error"
        });
    }
});
exports.updateUser = updateUser;
