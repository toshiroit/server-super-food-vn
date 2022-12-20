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
exports.authCheckPasswordByUserShop = exports.authRegister = exports.activeAccountRegister = exports.getCodeVerificationAccount = exports.authUpdateUserByShop = void 0;
const config_1 = __importDefault(require("../../../config/config"));
const mail_1 = require("../../../helpers/mail");
const getUserToken_1 = require("../../../libs/getUserToken");
const hash_password_1 = require("../../../libs/hash_password");
const make_id_1 = require("../../../libs/make_id");
const timeVietNam_1 = require("../../../libs/timeVietNam");
const auth_model_1 = require("../../../models/shop/auth/auth.model");
const dataUserTK = (req) => {
    const { cookie } = req.headers;
    const bearer = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[0].toLowerCase();
    const token = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[1];
    const data_user = (0, getUserToken_1.getDataUser)(token, bearer);
    return data_user;
};
const authUpdateUserByShop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const data_user = (_a = dataUserTK(req)) === null || _a === void 0 ? void 0 : _a.payload;
        const dataSQL = req.body;
        dataSQL.code_shop = data_user.code_shop;
        yield auth_model_1.AuthModel.authUpdateUserByShopModel(dataSQL, (err, result) => {
            if (err) {
                res.json({
                    error: err,
                });
            }
            else {
                if (result) {
                    res.json({
                        message: result.rows[0],
                    });
                }
            }
        });
    }
    catch (error) {
        res.json({
            error,
        });
    }
});
exports.authUpdateUserByShop = authUpdateUserByShop;
const getCodeVerificationAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.body;
        if (username) {
            const dataVerification = yield auth_model_1.AuthModel.authGetVerificationCodeByUserName({ user_name: username || '' });
            if (dataVerification.rows.length > 0 && dataVerification.rows[0] && dataVerification.rows[0].verification_code && dataVerification.rows[0].email) {
                const adata = yield (0, mail_1.sendMail)({
                    from: config_1.default.node_mailer_user,
                    to: dataVerification.rows[0].email,
                    subject: `Xác thực tài khoản của bạn ${username} - ${(0, timeVietNam_1.timeVietNameYesterday)()}`,
                    html: `Mã xác nhận tài khoản của bạn ${username} là : <b>${dataVerification.rows[0].verification_code}</b>`,
                });
                res.json({
                    data: adata,
                    message: 'Thành công',
                });
            }
        }
    }
    catch (error) {
        res.json({
            error: error,
        });
    }
});
exports.getCodeVerificationAccount = getCodeVerificationAccount;
const activeAccountRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { verification_code, user_name } = req.body;
    try {
        const dataSQLActive = {
            user_name,
            verification_code,
        };
        const data_check = yield auth_model_1.AuthModel.authCheckVerificationCode(dataSQLActive);
        if (data_check.rows[0] && data_check.rows[0].count > 0) {
            const data_isCheck = yield auth_model_1.AuthModel.authIsCheckVerification(dataSQLActive);
            console.log('CHECK ', data_isCheck.rows);
            if (data_isCheck.rows[0] && data_isCheck.rows[0].count === '0') {
                yield auth_model_1.AuthModel.authActiveAccountShopByUser({ user_name: dataSQLActive.user_name }, (err, result) => {
                    if (err) {
                        res.json({
                            error: err,
                        });
                    }
                    else {
                        if (result && result.rowCount > 0) {
                            res.json({
                                message: 'Kích hoạt thành công',
                            });
                        }
                        else {
                            res.status(400).json({
                                message: 'Kích hoạt không thành công',
                            });
                        }
                    }
                });
            }
            else {
                res.status(400).json({
                    code: 123,
                    message: 'Tài khoản nãy đã được kích hoạt',
                });
            }
        }
        else {
            res.status(400).json({
                message: 'Tải khoản không tồn tại hoặc mã kích hoạt không tòn tại ',
            });
        }
    }
    catch (error) {
        res.json({
            error: error,
        });
    }
});
exports.activeAccountRegister = activeAccountRegister;
const authRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataRegister = {
            code_user: (0, make_id_1.makeId)(15),
            code_user_detail: (0, make_id_1.makeId)(15),
            code_shop_detail: (0, make_id_1.makeId)(15),
            code_type_login: req.body.type_login === 1 ? 'CHECK-LOGIN-P' : req.body.type_login === 2 ? 'CHECK-LOGIN-E' : req.body.type_login === -1 ? null : null,
            verification_code: (0, make_id_1.makeId)(50),
            avatar: req.body.avatar,
            code_shop: (0, make_id_1.makeId)(15),
            password: (0, hash_password_1.hasPassword)(req.body.password),
            code_role: 'ROLE-WIXX-SHOP',
            phone: req.body.phone,
            username: req.body.username,
            createdAt: new Date(Date.now()).toISOString(),
            status: -1,
            full_name: req.body.full_name,
            sex: req.body.gender === 1 ? false : true,
            code_restpass: (0, make_id_1.makeId)(15),
            date_birth: req.body.birth_date,
            code_address: (0, make_id_1.makeId)(15),
            detail_address: req.body.detail_address,
            status_address: false,
            code_address_detail: (0, make_id_1.makeId)(15),
            phone_w: req.body.phone_shop,
            name_shop: req.body.name_shop,
            email: req.body.email,
            street: req.body.street,
            village: req.body.village,
            district: req.body.district,
            city: req.body.city,
            description: req.body.description,
        };
        const dataCheckRegister = {
            user_name: req.body.username,
            phone: req.body.phone,
        };
        const dataRegisterShopSQL = [
            dataRegister.code_user,
            dataRegister.code_user_detail,
            dataRegister.avatar,
            dataRegister.username,
            dataRegister.password,
            dataRegister.code_role,
            dataRegister.phone,
            dataRegister.createdAt,
            dataRegister.status,
            dataRegister.verification_code,
            dataRegister.code_type_login,
            dataRegister.full_name,
            dataRegister.sex,
            dataRegister.code_restpass,
            dataRegister.date_birth,
            dataRegister.createdAt,
            dataRegister.code_address,
            dataRegister.full_name,
            dataRegister.phone,
            dataRegister.detail_address,
            dataRegister.status_address,
            dataRegister.code_address_detail,
            dataRegister.phone_w,
            dataRegister.email,
            dataRegister.street,
            dataRegister.village,
            dataRegister.district,
            dataRegister.city,
            dataRegister.code_shop,
            dataRegister.name_shop,
            dataRegister.code_shop_detail,
            dataRegister.description, // 32
        ];
        const dataUser = yield auth_model_1.AuthModel.authCheckUser(dataCheckRegister);
        if (dataUser.rows) {
            const countUser = dataUser.rows[0].count;
            if (countUser) {
                if (Number(countUser) === 0) {
                    yield auth_model_1.AuthModel.authRegisterModel(dataRegisterShopSQL, (err, result) => {
                        if (err) {
                            res.json({
                                error: err,
                            });
                        }
                        else {
                            if (result) {
                                if (result.rowCount === 1) {
                                    (0, mail_1.sendMail)({
                                        from: config_1.default.node_mailer_user,
                                        to: dataRegister.email,
                                        subject: `Xác thực tài khoản của bạn ${dataRegister.username} - ${(0, timeVietNam_1.timeVietNameYesterday)()}`,
                                        html: `Mã xác nhận tài khoản của bạn ${dataRegister.username} là <b>${dataRegister.verification_code}</b>`,
                                    });
                                    res.json({
                                        message: 'Đăng kí tài khoản thành công',
                                    });
                                }
                            }
                        }
                    });
                }
                else {
                    res.status(400).json({
                        status: 400,
                        error_type: 1,
                        message: 'Tài khoản hoặc số điện thoại đã được đăng kí',
                    });
                }
            }
        }
    }
    catch (err) {
        res.json({
            error: err,
        });
    }
});
exports.authRegister = authRegister;
const authCheckPasswordByUserShop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data_user = yield dataUserTK(req);
        const dataSQL = {
            code_shop: data_user === null || data_user === void 0 ? void 0 : data_user.payload.code_shop,
            user_name: data_user === null || data_user === void 0 ? void 0 : data_user.payload.user_name,
            password: req.query.password,
        };
        yield auth_model_1.AuthModel.authCheckPasswordByShop(dataSQL, (err, result) => {
            if (err) {
                res.json({
                    error: err,
                });
            }
            else {
                if (result) {
                    const password_user = result.rows[0].password;
                    const isPassword = (0, hash_password_1.comparePassword)(dataSQL.password, password_user.trim() || '');
                    if (isPassword) {
                        res.json({
                            message: 'Mật khẩu chính xác',
                        });
                    }
                    else {
                        res.status(400).json({
                            message: 'Mật khẩu không chính xác',
                        });
                    }
                }
            }
        });
    }
    catch (error) {
        res.json({
            error,
        });
    }
});
exports.authCheckPasswordByUserShop = authCheckPasswordByUserShop;
