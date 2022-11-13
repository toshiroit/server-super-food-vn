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
exports.removeCart = exports.addCartByCodeUser = exports.getCart = void 0;
const config_1 = __importDefault(require("../../config/config"));
const cart_model_1 = require("../../models/cart/cart.model");
const jwt_token_1 = require("../../utils/jwt/jwt-token");
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield cart_model_1.CartModel.getCartModel(req.query.code_user, (err, result) => {
            if (err) {
                res.json({
                    error: err
                });
            }
            else {
                res.json({
                    mess: 'suceess',
                    data: result
                });
            }
        });
    }
    catch (err) {
        res.json({
            error: err
        });
    }
});
exports.getCart = getCart;
const addCartByCodeUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cookie } = req.headers;
        const bearer = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[0].toLowerCase();
        const token = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[1];
        if (token && bearer === 'jwt') {
            const user = (0, jwt_token_1.verifyJWT)(token, config_1.default.refresh_token_secret);
            const dataQuery = {
                table: 'cart_sp',
                condition: null,
                field: null,
                value: [req.body, user.payload.code_user],
                obj: {
                    condition: null
                }
            };
            try {
                cart_model_1.CartModel.addCartByCodeUserModel(dataQuery, (err, result) => {
                    if (err) {
                        if (err.code === '23505') {
                            res.json({
                                message: 'Sản phẩm trong giỏ hàng đã tồn tại '
                            });
                        }
                        res.json({
                            error: err
                        });
                    }
                    else {
                        res.json({
                            data: result
                        });
                    }
                });
            }
            catch (err) {
                res.json({
                    error: err
                });
            }
        }
        else {
            res.json({
                error: 'ERROR NOT FOUND JWT',
            });
        }
    }
    catch (err) {
        res.json({
            error: err
        });
    }
});
exports.addCartByCodeUser = addCartByCodeUser;
const removeCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cookie } = req.headers;
        const bearer = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[0].toLowerCase();
        const token = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[1];
        if (token && bearer === 'jwt') {
            const user = (0, jwt_token_1.verifyJWT)(token, config_1.default.refresh_token_secret);
            const dataQuery = {
                table: 'cart_sp',
                condition: null,
                field: null,
                value: [req.query.code_cart, user.payload.code_user],
                obj: {
                    condition: null
                }
            };
            try {
                cart_model_1.CartModel.removeCartByCodeCartModel(dataQuery, ((err, result) => {
                    if (err) {
                        res.json({
                            error: err
                        });
                    }
                    else {
                        if (result === null || result === void 0 ? void 0 : result.rowCount) {
                            res.json({
                                message: result
                            });
                        }
                    }
                }));
            }
            catch (err) {
                res.json({
                    error: err
                });
            }
        }
        else {
            res.json({
                error: 'ERROR NOT FOUND JWT',
            });
        }
    }
    catch (err) {
        res.json({
            error: err
        });
    }
});
exports.removeCart = removeCart;
