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
exports.confirmOrderByCodeOrder = exports.removeOrderByShop = exports.getOrderDetailByOrderAndShop = exports.getAllProductByOrderAndShop = exports.getAllOrderByShop = exports.hideOrderByShop = exports.addOrderByShop = exports.dataUserTK = void 0;
const getPagination_1 = require("../../../libs/getPagination");
const getUserToken_1 = require("../../../libs/getUserToken");
const order_model_1 = require("../../../models/shop/order/order.model");
const dataUserTK = (req) => {
    const { cookie } = req.headers;
    const bearer = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[0].toLowerCase();
    const token = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[1];
    const data_user = (0, getUserToken_1.getDataUser)(token, bearer);
    return data_user;
};
exports.dataUserTK = dataUserTK;
const addOrderByShop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json({
            message: 'TEST',
        });
    }
    catch (err) {
        res.json({
            error: err,
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
            code_shop: data_user === null || data_user === void 0 ? void 0 : data_user.payload.code_shop,
        };
        yield order_model_1.OrderModel.hideOrderByShop(dataSQL, (err, result) => {
            if (err) {
                res.json({
                    error: err,
                });
            }
            else {
                if (result) {
                    if (result.rowCount === 1) {
                        res.json({
                            message: 'Ẩn đơn hàng thành công ',
                        });
                    }
                    else if (result.rowCount === 0) {
                        res.json({
                            message: 'Ẩn đơn hàng không thành công ',
                        });
                    }
                    else {
                        res.json({
                            message: 'Lỗi',
                        });
                    }
                }
            }
        });
        res.json({
            message: 'TEST',
        });
    }
    catch (err) {
        res.json({
            error: err,
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
        const { name_search, date_start, date_end, status_order, type_payment } = req.query;
        if (data_user) {
            const code_shop = data_user === null || data_user === void 0 ? void 0 : data_user.payload.code_shop;
            const type = req.query.type;
            const page = req.query.page;
            const value_search = {
                name_search: name_search || null,
                date_start: date_start || null,
                status_order: Number(status_order) || null,
                type_payment: Number(type_payment) || null,
                date_end: date_end || null,
            };
            console.log('value : ', value_search);
            const data_count = yield order_model_1.OrderModel.getCountOrderByShop({ code_shop: code_shop, type: type, page: Number(page) || 1, value_search: value_search });
            yield order_model_1.OrderModel.getAllOrderByShop({ code_shop: code_shop, type: type, page: Number(page) || 1, value_search: value_search }, (err, result) => {
                if (err) {
                    res.json({
                        error: err,
                    });
                }
                else {
                    if (result) {
                        if (result.rows && result.rows.length !== 0) {
                            if (type === 'all') {
                                res.json({
                                    data: result.rows,
                                });
                            }
                            else {
                                const dataPaging = {
                                    count: Number(data_count.rows[0].count) || 0,
                                    rows: result.rows,
                                };
                                const { tutorials, totalItems, totalPages, currentPage } = (0, getPagination_1.getPagingData)(dataPaging, Number(page) || 1, 10);
                                res.json({
                                    page: page,
                                    totalItems,
                                    totalPages,
                                    currentPage,
                                    data: result.rows,
                                });
                            }
                        }
                        else if (result.rows.length === 0) {
                            res.status(203).json({
                                status: 203,
                                message: 'Không có đơn hàng ',
                            });
                        }
                        else {
                            res.json({
                                message: 'Lỗi',
                            });
                        }
                    }
                }
            });
        }
        else {
            res.json({
                error: 'Not data user',
            });
        }
    }
    catch (err) {
        res.json({
            error: err,
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
                        error: err,
                    });
                }
                else {
                    if (result) {
                        if (result.rows.length !== 0) {
                            res.json({
                                data: result.rows,
                            });
                        }
                        else if (result.rows.length === 0) {
                            res.json({
                                message: 'Không có dữ liệu ',
                            });
                        }
                        else {
                            res.json({
                                message: 'Lỗi',
                            });
                        }
                    }
                }
            });
        }
    }
    catch (err) {
        res.json({
            error: err,
        });
    }
});
exports.getAllProductByOrderAndShop = getAllProductByOrderAndShop;
const getOrderDetailByOrderAndShop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data_user = (0, exports.dataUserTK)(req);
        if (data_user) {
            const dataSQL = {
                code_shop: data_user.payload.code_shop,
                code_order: req.query.code_order || '',
            };
            yield order_model_1.OrderModel.getOrderDetailByOrderAndShop(dataSQL, (err, result) => {
                if (err) {
                    res.json({
                        error: err,
                    });
                }
                else {
                    if (result) {
                        res.json({
                            data: result.rows,
                        });
                    }
                }
            });
        }
    }
    catch (err) {
        res.json({
            error: err,
        });
    }
});
exports.getOrderDetailByOrderAndShop = getOrderDetailByOrderAndShop;
const removeOrderByShop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cookie } = req.headers;
        const bearer = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[0].toLowerCase();
        const token = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[1];
        const data_user = (0, getUserToken_1.getDataUser)(token, bearer);
        const dataSQL = {
            code_order: req.query.code_order,
            code_shop: data_user === null || data_user === void 0 ? void 0 : data_user.payload.code_shop,
        };
        yield order_model_1.OrderModel.removeOrderByShopModel(dataSQL, (err, result) => {
            if (err) {
                res.json({
                    error: err,
                });
            }
            else {
                if (result) {
                    if (result.rowCount === 1) {
                        res.json({
                            message: 'Xóa đơn hàng thành công ',
                        });
                    }
                    else if (result.rowCount === 0) {
                        res.json({
                            message: 'Xóa đơn hàng không thành công ',
                        });
                    }
                    else {
                        res.json({
                            message: 'Lỗi',
                        });
                    }
                }
            }
        });
    }
    catch (err) {
        res.json({
            error: err,
        });
    }
});
exports.removeOrderByShop = removeOrderByShop;
const confirmOrderByCodeOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data_user = (0, exports.dataUserTK)(req);
        if (data_user) {
            const { code_order } = req.query;
            const { value } = req.body;
            const dataSQL = {
                code_shop: data_user.payload.code_shop,
                code_order: code_order || '',
                value: value,
            };
            console.log('data SQL : ', dataSQL);
            yield order_model_1.OrderModel.confirmOrderByCodeOrderModel(dataSQL, (err, result) => {
                if (err) {
                    res.json({
                        error: err,
                    });
                }
                else {
                    if (result) {
                        if (result.rowCount > 0) {
                            res.json({
                                message: 'Cập nhật thành công ',
                            });
                        }
                        else {
                            res.json({
                                message: 'Cập nhật không thành công ',
                            });
                        }
                    }
                }
            });
        }
    }
    catch (err) {
        res.json({
            error: err,
        });
    }
});
exports.confirmOrderByCodeOrder = confirmOrderByCodeOrder;
