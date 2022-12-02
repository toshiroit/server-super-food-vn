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
exports.followShopByUser = exports.getAllProductByShop = exports.shopInfoDetailByCodeShop = void 0;
const getPagination_1 = require("../../../libs/getPagination");
const getUserToken_1 = require("../../../libs/getUserToken");
const info_model_1 = require("../../../models/shop/info/info.model");
const dataUserTK = (req) => {
    const { cookie } = req.headers;
    const bearer = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[0].toLowerCase();
    const token = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[1];
    const data_user = (0, getUserToken_1.getDataUser)(token, bearer);
    return data_user;
};
const shopInfoDetailByCodeShop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code_shop } = req.query;
        const data_user = dataUserTK(req);
        const code_user = (data_user === null || data_user === void 0 ? void 0 : data_user.payload.code_user) || null;
        yield info_model_1.InfoShopModel.getDetailShopInfoByCodeShop({
            code_shop: code_shop || '',
            code_user: code_user,
        }, (err, result) => {
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
    catch (err) {
        res.json({
            error: err,
        });
    }
});
exports.shopInfoDetailByCodeShop = shopInfoDetailByCodeShop;
const getAllProductByShop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code_shop, page, q } = req.query;
        const dataCountProductShop = yield info_model_1.InfoShopModel.getCountAllProductShopModel({ code_shop: code_shop || '', q: q || '' });
        const dataCategoryProductShop = yield info_model_1.InfoShopModel.getAllCategoryProductShopModel({ code_shop: code_shop || '', q: q || '' });
        yield info_model_1.InfoShopModel.getAllProductShopModel({
            code_shop: code_shop || '',
            page: Number(page) || 1,
            q: q || '',
        }, (err, result) => {
            if (err) {
                res.json({
                    error: err,
                });
            }
            else {
                if (result) {
                    const dataPaging = {
                        count: Number(dataCountProductShop.rows[0].count) || 0,
                        rows: result.rows,
                    };
                    const { tutorials, totalItems, totalPages, currentPage } = (0, getPagination_1.getPagingData)(dataPaging, Number(page) || 1, 20);
                    res.json({
                        category: dataCategoryProductShop.rows[0],
                        totalPages,
                        totalItems,
                        limit: 20,
                        currentPage,
                        data: tutorials,
                    });
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
exports.getAllProductByShop = getAllProductByShop;
const followShopByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code_shop } = req.body;
        const data_user = dataUserTK(req);
        if (data_user) {
            yield info_model_1.InfoShopModel.followShopByUserModel({ code_shop: code_shop || '', code_user: (data_user === null || data_user === void 0 ? void 0 : data_user.payload.code_user) || '' }, (err, result) => {
                if (err) {
                    res.json({
                        error: err,
                    });
                }
                else {
                    if (result) {
                        if (result.rowCount > 0) {
                            res.json({
                                message: 'Theo dõi thành công',
                            });
                        }
                        else {
                            res.json({
                                message: 'Theo dỗi không thành công',
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
exports.followShopByUser = followShopByUser;
