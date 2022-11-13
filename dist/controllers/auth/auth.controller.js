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
exports.verifyCodeAuth = exports.checkPhoneAuth = exports.SendCodePhone = exports.VerifyTokenUser = exports.getMe = exports.loginAuthAdmin = exports.getAllUsers = exports.registerUser = exports.refreshToken = exports.verifyAuthMailer = exports.loginPhone = exports.loginUser = exports.getMeShop = exports.logoutUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_model_1 = require("./../../models/auth/auth.model");
const config_1 = __importDefault(require("../../config/config"));
const jwt_token_1 = require("../../utils/jwt/jwt-token");
const make_id_1 = require("../../libs/make_id");
const hash_password_1 = require("../../libs/hash_password");
const capcha_number_1 = require("../../libs/capcha_number");
const getUserToken_1 = require("../../libs/getUserToken");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valueQuery = {
            table: 'users',
            field: '',
            obj: {
                condition: null,
            },
            value: [],
        };
        yield auth_model_1.AuthModel.getAllNoField(valueQuery, (err, result) => {
            if (err) {
                res.json({
                    error: err,
                });
            }
            else {
                res.json({
                    data: result,
                });
            }
        });
    }
    catch (error) {
        res.json({
            error: error
        });
    }
});
exports.getAllUsers = getAllUsers;
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cookie } = req.headers;
        const bearer = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[0].toLowerCase();
        const token = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[1];
        if (token && bearer === 'jwt') {
            const user = (0, jwt_token_1.verifyJWT)(token, config_1.default.refresh_token_secret);
            delete user.payload.password;
            delete user.payload.verification_code;
            delete user.payload.passwordResetCode;
            res.json({
                data: user,
            });
        }
        else {
            res.json({
                error: '12412',
            });
        }
    }
    catch (error) {
        res.json({
            error: error,
        });
    }
    // console.log(authorization);
});
exports.getMe = getMe;
const loginPhone = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        cookie: res.cookie,
        data: res.locals,
    });
    // await AuthModel.loginUserModel();
});
exports.loginPhone = loginPhone;
const VerifyTokenUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.get('Authorization');
        const authorization = req.headers.authorization;
        if (authorization) {
            const reqValueLogin = {
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
        }
    }
    catch (error) {
        res.json({
            error: "error"
        });
    }
});
exports.VerifyTokenUser = VerifyTokenUser;
const SendCodePhone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = {
            phone: req.body.phone,
            capCha: (0, capcha_number_1.GetCAPTCHACode)(),
        };
        let isPhone = false;
        yield auth_model_1.AuthModel.sendCodeModel(data, (err, result) => {
            if (err) {
                res.status(500).json({
                    error: err,
                });
            }
            else {
                res.status(200).json({
                    message: 'Gửi mã thành công - vui lòng kiểm tra ',
                });
            }
        });
    }
    catch (error) {
        res.status(401).json({
            error: error,
        });
    }
});
exports.SendCodePhone = SendCodePhone;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // res.setHeader('Set-Cookie', 'visited=true; Max-Age=3000; HttpOnly, Secure');
    try {
        const valueQuery = {
            table: 'users',
            value: {
                code_user: (0, make_id_1.makeId)(14).toUpperCase(),
                code_user_detail: (0, make_id_1.makeId)(14).toUpperCase(),
                password: req.body.password,
                role: 'ROLE-WIAO-ADMIN',
                phone: req.body.phone,
                hashPassword: (0, hash_password_1.hasPassword)(req.body.password),
                createdAt: new Date(Date.now()).toISOString(),
                status: false,
                full_name: req.body.fullName || '',
                sex: false,
                code_restpass: (0, make_id_1.makeId)(14),
                createdAtDetail: new Date(Date.now()).toISOString()
            },
            field: null,
            obj: {
                condition: null,
            },
        };
        yield auth_model_1.AuthModel.loginUserModel(valueQuery, (err, result) => {
            if (err) {
                res.status(401).json({
                    error: err.message,
                });
            }
            else {
                if (result === null || result === void 0 ? void 0 : result.rows[0]) {
                    delete result.rows[0].password;
                    delete result.rows[0].passwordResetCode;
                    delete result.rows[0].refresh_token;
                    delete result.rows[0].verification_code;
                    const tokens = (0, jwt_token_1.jwtTokens)(result.rows[0]);
                    res.cookie('jwt', tokens.refreshToken, {
                        expires: new Date(Date.now() + 12000),
                        httpOnly: true,
                        path: '/',
                        maxAge: 24 * 60 * 60 * 1000,
                        sameSite: 'strict',
                    });
                    res.json({
                        token: tokens.accessToken,
                        data: result.rows[0],
                    });
                }
                else {
                    if ((result === null || result === void 0 ? void 0 : result.command) === 'INSERT') {
                        if (result.rowCount === 1) {
                            res.status(200).json({
                                status: 200,
                                message: 'Đăng kí tài khoản thành công ',
                            });
                        }
                        else {
                            res.status(400).json({
                                status: 400,
                                message: 'Đăng kí tài khoản không thành công ',
                            });
                        }
                    }
                    else if (result === null || result === void 0 ? void 0 : result.command) {
                        res.json({
                            message: result
                        });
                    }
                    else {
                        res.status(401).json({
                            message: 'Tài khoản hoặc mật khẩu không chính xác ',
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
exports.loginUser = loginUser;
/**
 *
 * @param req body none
 * @param res
 * @description logout user remove token server
 */
const logoutUser = (req, res) => {
    try {
        res.clearCookie('jwt');
        res.json({
            message: 'Đăng xuất thành công ',
        });
    }
    catch (error) {
        res.json({
            message: 'Đăng xuất thành công không thành công ',
        });
    }
};
exports.logoutUser = logoutUser;
/**
 *
 * @param req
 * @param res
 * @returns Rest token new
 */
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refresh_token = req.cookies.jwt;
    try {
        if (!refresh_token)
            return res.status(401).json({ error: 'error' });
        jsonwebtoken_1.default.verify(refresh_token, config_1.default.refresh_token_secret, (err, data) => {
            if (err) {
                res.status(401).json({
                    error: err,
                });
            }
            else {
                res.status(200).json({
                    data,
                    refresh_token,
                });
            }
        });
    }
    catch (error) {
        res.json({
            error,
            token: refresh_token,
        });
    }
});
exports.refreshToken = refreshToken;
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valueQuery = {
            table: 'user_sp',
            obj: {
                condition: null,
            },
            field: null,
            value: [
                (0, make_id_1.makeId)(14),
                (0, hash_password_1.hasPassword)('chanelnam2020'),
                'ROLE-WIXO-USER',
                req.body.phone,
                new Date(Date.now()).toISOString(),
                false,
            ],
        };
        yield auth_model_1.AuthModel.registerUserModel(valueQuery, (err, result) => {
            if (err) {
                if (err.code === '23505') {
                    res.status(400).json({
                        message: 'Số điện thoại đã được đăng kí ',
                    });
                }
                else {
                    res.json({
                        error: err,
                    });
                }
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
exports.registerUser = registerUser;
const verifyAuthMailer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.verifyAuthMailer = verifyAuthMailer;
const checkPhoneAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valueQuery = {
            table: 'user_sp',
            field: 'phone',
            value: [req.body.phone],
            condition: null,
            obj: {
                condition: null,
            },
        };
        auth_model_1.AuthModel.checkPhone(valueQuery, (err, result) => {
            if (err) {
                res.status(500).json({
                    error: err,
                });
            }
            else {
                if ((result === null || result === void 0 ? void 0 : result.rows.length) === 0) {
                    res.status(200).json({
                        status: 200,
                        data: result.rows.length,
                        message: 'Phone not is register',
                    });
                }
                else {
                    res.status(200).json({
                        status: 200,
                        data: result === null || result === void 0 ? void 0 : result.rows.length,
                        message: 'Phone register',
                    });
                }
            }
        });
    }
    catch (error) {
        res.status(500).json({
            error: 'Error',
        });
    }
});
exports.checkPhoneAuth = checkPhoneAuth;
const verifyCodeAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        message: 'OK',
    });
});
exports.verifyCodeAuth = verifyCodeAuth;
const loginAuthAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_name, password } = req.body;
        const dataSQL = {
            user_name: user_name,
            password: password
        };
        const dataUserModel = yield auth_model_1.AuthModel.getUserAdminModel(dataSQL);
        if (dataUserModel.rows.length > 0) {
            const isPassword = (0, hash_password_1.comparePassword)(password, dataUserModel.rows[0].password.trim());
            if (isPassword) {
                delete dataUserModel.rows[0].password;
                delete dataUserModel.rows[0].passwordResetCode;
                delete dataUserModel.rows[0].refresh_token;
                delete dataUserModel.rows[0].verification_code;
                const tokens = (0, jwt_token_1.jwtTokens)(dataUserModel.rows[0]);
                res.cookie('jwt', tokens.refreshToken, {
                    expires: new Date(Date.now() + 900000),
                    httpOnly: true,
                    path: '/',
                    maxAge: 24 * 60 * 60 * 1000,
                    sameSite: 'strict'
                });
                res.json({
                    token: tokens.accessToken,
                    message: "Đăng nhập thành công ",
                    data: dataUserModel.rows
                });
            }
            else {
                res.status(400).json({
                    message: "Tên tài khoản hoặc mật khẩu không đúng"
                });
            }
        }
        else {
            res.status(400).json({
                message: "Tên tài khoản hoặc mật khẩu không đúng"
            });
        }
    }
    catch (err) {
        res.json({
            error: "Error"
        });
    }
});
exports.loginAuthAdmin = loginAuthAdmin;
const getMeShop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cookie } = req.headers;
        const bearer = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[0].toLowerCase();
        const token = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[1];
        const dataUser = (0, getUserToken_1.getDataUser)(token, bearer);
        if (dataUser) {
            const data = dataUser.payload;
            yield auth_model_1.AuthModel.getMeShopModel({ code_user: data.code_user.trim() || '' }, (err, result) => {
                if (err) {
                    res.json({
                        error: err
                    });
                }
                else {
                    if (result) {
                        if (result.rows.length > 0) {
                            res.json({
                                data: result.rows
                            });
                        }
                        else {
                            res.json({
                                message: "Lỗi hệ thông"
                            });
                        }
                    }
                }
            });
        }
    }
    catch (err) {
        res.json({
            error: "Error"
        });
    }
});
exports.getMeShop = getMeShop;
