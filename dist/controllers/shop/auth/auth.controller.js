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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authReister = void 0;
const hash_password_1 = require("../../../libs/hash_password");
const make_id_1 = require("../../../libs/make_id");
const auth_model_1 = require("../../../models/shop/auth/auth.model");
const authReister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataRegister = {
            code_user: (0, make_id_1.makeId)(15),
            code_user_detail: (0, make_id_1.makeId)(15),
            code_shop_detail: (0, make_id_1.makeId)(15),
            code_shop: (0, make_id_1.makeId)(15),
            password: (0, hash_password_1.hasPassword)(req.body.password),
            code_role: 'ROLE-WIXX-SHOP',
            phone: req.body.phone,
            username: req.body.username,
            createdAt: new Date(Date.now()).toISOString(),
            status: false,
            full_name: req.body.name,
            sex: req.body.gender === 1 ? false : true,
            code_restpass: (0, make_id_1.makeId)(15),
            date_birth: req.body.birth_date,
            code_address: (0, make_id_1.makeId)(15),
            detail_address: '',
            status_address: false,
            code_address_detail: (0, make_id_1.makeId)(15),
            phone_w: req.body.phone_shop,
            name_shop: req.body.name_shop,
            email: req.body.email,
            street: '',
            village: '',
            district: '',
            province: '',
            city: ''
        };
        const dataCheckRegister = {
            user_name: req.body.username,
            phone: req.body.phone
        };
        const dataRegisterShopSQL = [
            dataRegister.code_user,
            dataRegister.code_user_detail,
            '',
            dataRegister.username,
            dataRegister.password,
            dataRegister.code_role,
            dataRegister.phone,
            dataRegister.createdAt,
            dataRegister.status,
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
            dataRegister.code_user_detail,
            dataRegister.phone_w,
            dataRegister.email,
            dataRegister.street,
            dataRegister.village,
            dataRegister.district,
            dataRegister.province,
            dataRegister.city,
            dataRegister.code_shop,
            dataRegister.name_shop,
            dataRegister.code_shop_detail,
        ];
        const dataUser = yield auth_model_1.AuthModel.authCheckUser(dataCheckRegister);
        console.log(dataUser.rows);
        if (dataUser.rows) {
            const countUser = dataUser.rows[0].count;
            if (countUser) {
                if (Number(countUser) === 0) {
                    yield auth_model_1.AuthModel.authRegisterModel(dataRegisterShopSQL, (err, result) => {
                        if (err) {
                            res.json({
                                error: err
                            });
                        }
                        else {
                            if (result) {
                                if (result.rowCount === 1) {
                                    res.json({
                                        message: 'Đăng kí tài khoản thành công'
                                    });
                                }
                            }
                        }
                    });
                }
                else {
                    res.json({
                        status: 203,
                        message: 'Tài khoản đã được đăng kí'
                    });
                }
            }
        }
    }
    catch (err) {
        res.json({
            error: err
        });
    }
});
exports.authReister = authReister;
