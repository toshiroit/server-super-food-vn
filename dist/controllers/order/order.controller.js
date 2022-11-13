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
exports.getOrderDetailByCodeOrder = exports.getOrderByUser = void 0;
const config_1 = __importDefault(require("../../config/config"));
const getPagination_1 = require("../../libs/getPagination");
const getUserToken_1 = require("../../libs/getUserToken");
const order_model_1 = require("../../models/order/order.model");
const jwt_token_1 = require("../../utils/jwt/jwt-token");
const getOrderByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page } = req.query;
    console.log("Page : ", page);
    try {
        const { cookie } = req.headers;
        const bearer = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[0].toLowerCase();
        const token = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[1];
        if (token && bearer === 'jwt') {
            const user = (0, jwt_token_1.verifyJWT)(token, config_1.default.refresh_token_secret);
            delete user.payload.password;
            delete user.payload.verification_code;
            delete user.payload.passwordResetCode;
            const dataSQL = {
                codeUser: user.payload.code_user || '',
                page: page || '1',
            };
            const dataCount = yield order_model_1.OrderModel.getCountOrderByUserModel(dataSQL);
            yield order_model_1.OrderModel.getOrderByUserModel(dataSQL, (err, result) => {
                if (err) {
                    res.json({
                        error: err
                    });
                }
                else {
                    if (result) {
                        const dataPaging = {
                            count: Number(dataCount.rows[0].count || 0),
                            rows: result.rows
                        };
                        const { tutorials, totalItems, totalPages, currentPage } = (0, getPagination_1.getPagingData)(dataPaging, Number(page) || 0, Number(config_1.default.order_user_limit_show) || 2);
                        res.json({
                            totalItems,
                            totalPages,
                            currentPage: Number(page),
                            limit: Number(config_1.default.order_user_limit_show),
                            data: tutorials
                        });
                    }
                }
            });
        }
    }
    catch (err) {
        res.json({
            error: "error"
        });
    }
});
exports.getOrderByUser = getOrderByUser;
const getOrderDetailByCodeOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code_order } = req.query;
        const { cookie } = req.headers;
        const bearer = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[0].toLowerCase();
        const token = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[1];
        const resultUser = (0, getUserToken_1.getDataUser)(token, bearer);
        const dataSQL = {
            code_order: code_order || '',
            code_user: resultUser === null || resultUser === void 0 ? void 0 : resultUser.payload.code_user
        };
        yield order_model_1.OrderModel.getOrderDetailByUser(dataSQL, (err, result) => {
            if (err) {
                res.json({
                    error: err
                });
            }
            else {
                if (result) {
                    if (result.rowCount === 0 || result.rows.length === 0) {
                        res.json({
                            data: [],
                            message: "Không có sản phẩm"
                        });
                    }
                    else {
                        res.json({
                            data: result.rows
                        });
                    }
                }
            }
        });
    }
    catch (err) {
        res.json({
            error: "error"
        });
    }
});
exports.getOrderDetailByCodeOrder = getOrderDetailByCodeOrder;
