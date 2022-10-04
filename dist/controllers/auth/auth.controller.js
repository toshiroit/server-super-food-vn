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
exports.AuthController = void 0;
const auth_model_1 = require("./../../models/auth/auth.model");
const mailer_1 = __importDefault(require("../../utils/mail/mailer"));
const config_1 = __importDefault(require("../../config/config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const hasPassword = (password) => {
    const salt = parseInt(config_1.default.salt, 10);
    return bcrypt_1.default.hashSync(`${password}${config_1.default.pepper}`, salt);
};
class AuthController extends auth_model_1.AuthModel {
    static LoginUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const reqValueLogin = {
                username: req.body.username,
                phone: req.body.phone,
                password: req.body.password,
                passwordConfirmation: req.body.passwordConfirmation,
            };
            const valueQuery = {
                table: 'users',
                value: reqValueLogin,
                field: null,
                obj: {
                    condition: null,
                },
            };
            try {
                yield auth_model_1.AuthModel.loginUserModel(valueQuery, (err, result) => {
                    if (err) {
                        res.status(401).json({
                            error: err,
                        });
                    }
                    else {
                        if (result === null || result === void 0 ? void 0 : result.rows[0]) {
                            const user = result.rows[0];
                            //const token = jwt.sign({ user }, config.tokenSecret as unknown as string);
                            if (!user) {
                                res.status(401).json({
                                    status: 'error',
                                    message: 'The username and password do not match please try again',
                                });
                            }
                        }
                    }
                });
            }
            catch (error) {
                return res.status(500).json({
                    error: error,
                });
            }
        });
    }
    static registerUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const valueQuery = {
                    table: 'users',
                    obj: {
                        condition: null,
                    },
                    field: null,
                    value: {
                        email: req.body.email,
                        user_name: req.body.user_name,
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        password: hasPassword(req.body.password),
                        verification_code: '568168148124',
                        verified: false,
                    },
                };
                yield (0, mailer_1.default)({
                    from: 'test@example.com',
                    to: req.body.email,
                    subject: 'Please verify your account',
                    text: `Verification coe ${'568168148124'} , ${req.body.email}`,
                });
                yield auth_model_1.AuthModel.registerUserModel(valueQuery, (err, result) => {
                    if (err) {
                        res.status(400).json({ error: err });
                    }
                    else {
                        res.status(200).json({ data: result });
                    }
                });
            }
            catch (error) {
                console.log('Error', error);
            }
        });
    }
    static verifyAuthMailer(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const verificationCode = req.params.verificationCode;
            const valueQuery = {
                table: 'users',
                obj: {
                    condition: null,
                },
                field: 'id',
                value: [Number(id), verificationCode],
            };
            auth_model_1.AuthModel.verifyAuthMailerModel(valueQuery, (err, result) => {
                if (err) {
                    res.status(400).json({
                        message: 'Error',
                    });
                }
                else {
                    if (!(result === null || result === void 0 ? void 0 : result.rows) || (result === null || result === void 0 ? void 0 : result.rows.length) === 0) {
                        res.status(203).json({
                            status: 203,
                            message: 'Error account verify code',
                        });
                    }
                    else {
                        res.status(200).json({
                            status: 200,
                            data: result.rows,
                        });
                    }
                }
            });
        });
    }
}
exports.AuthController = AuthController;
