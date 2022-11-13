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
exports.removeOrderByShop = exports.getAllProductByOrderAndShop = exports.getAllOrderByShop = exports.hideOrderByShop = exports.addOrderByShop = void 0;
const getUserToken_1 = require("../../../libs/getUserToken");
const order_model_1 = require("../../../models/shop/order/order.model");
const addOrderByShop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json({
            message: "TEST"
        });
    }
    catch (err) {
        res.json({
            error: err
        });
    }
});
exports.addOrderByShop = addOrderByShop;
const hideOrderByShop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cookie } = req.headers;
        const bearer = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[0].toLowerCase();
        const token = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[1];
        const data_user = (0, getUserToken_1.getDataUser)(token, bearer);
        const dataSQL = {
            code_order: req.body.code_order,
            is_show: req.body.is_show,
            code_shop: data_user === null || data_user === void 0 ? void 0 : data_user.payload.code_shop
        };
        yield order_model_1.OrderModel.hideOrderByShop(dataSQL, (err, result) => {
            if (err) {
                res.json({
                    error: err
                });
            }
            else {
                if (result) {
                    if (result.rowCount === 1) {
                        res.json({
                            message: "Ẩn đơn hàng thành công "
                        });
                    }
                    else if (result.rowCount === 0) {
                        res.json({
                            message: "Ẩn đơn hàng không thành công "
                        });
                    }
                    else {
                        res.json({
                            message: 'Lỗi'
                        });
                    }
                }
            }
        });
        res.json({
            message: "TEST"
        });
    }
    catch (err) {
        res.json({
            error: err
        });
    }
});
exports.hideOrderByShop = hideOrderByShop;
const getAllOrderByShop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cookie } = req.headers;
        const bearer = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[0].toLowerCase();
        const token = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[1];
        const data_user = (0, getUserToken_1.getDataUser)(token, bearer);
        if (data_user) {
            const code_shop = data_user === null || data_user === void 0 ? void 0 : data_user.payload.code_shop;
            yield order_model_1.OrderModel.getAllOrderByShop({ code_shop: code_shop }, (err, result) => {
                if (err) {
                    res.json({
                        error: err
                    });
                }
                else {
                    if (result) {
                        if (result.rows && result.rows.length !== 0) {
                            res.json({
                                data: result.rows
                            });
                        }
                        else if (result.rows.length === 0) {
                            res.json({
                                message: "Không có đơn hàng "
                            });
                        }
                        else {
                            res.json({
                                message: "Lỗi"
                            });
                        }
                    }
                }
            });
        }
        else {
            res.json({
                error: "Not data user"
            });
        }
    }
    catch (err) {
        res.json({
            error: err
        });
    }
});
exports.getAllOrderByShop = getAllOrderByShop;
const getAllProductByOrderAndShop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cookie } = req.headers;
        const bearer = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[0].toLowerCase();
        const token = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[1];
        const data_user = (0, getUserToken_1.getDataUser)(token, bearer);
        if (data_user) {
            const code_shop = data_user === null || data_user === void 0 ? void 0 : data_user.payload.code_shop;
            yield order_model_1.OrderModel.getAllProductByOrderAndShop({ code_shop }, (err, result) => {
                if (err) {
                    res.json({
                        error: err
                    });
                }
                else {
                    if (result) {
                        if (result.rows.length !== 0) {
                            res.json({
                                data: result.rows
                            });
                        }
                        else if (result.rows.length === 0) {
                            res.json({
                                message: 'Không có dữ liệu '
                            });
                        }
                        else {
                            res.json({
                                message: 'Lỗi'
                            });
                        }
                    }
                }
            });
        }
    }
    catch (err) {
        res.json({
            error: err
        });
    }
});
exports.getAllProductByOrderAndShop = getAllProductByOrderAndShop;
const removeOrderByShop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cookie } = req.headers;
        const bearer = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[0].toLowerCase();
        const token = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[1];
        const data_user = (0, getUserToken_1.getDataUser)(token, bearer);
        const dataSQL = {
            code_order: req.query.code_order,
            code_shop: data_user === null || data_user === void 0 ? void 0 : data_user.payload.code_shop
        };
        yield order_model_1.OrderModel.removeOrderByShopModel(dataSQL, (err, result) => {
            if (err) {
                res.json({
                    error: err
                });
            }
            else {
                if (result) {
                    if (result.rowCount === 1) {
                        res.json({
                            message: "Xóa đơn hàng thành công "
                        });
                    }
                    else if (result.rowCount === 0) {
                        res.json({
                            message: "Xóa đơn hàng không thành công "
                        });
                    }
                    else {
                        res.json({
                            message: 'Lỗi'
                        });
                    }
                }
            }
        });
    }
    catch (err) {
        res.json({
            error: err
        });
    }
});
exports.removeOrderByShop = removeOrderByShop;
