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
exports.addTypeProductByShop = exports.removeProductByShop = exports.getAllProductType = exports.getProductByCodeAndShop = exports.addProductShop = exports.getAllProductShop = exports.dataUserTK = void 0;
const config_1 = __importDefault(require("../../../config/config"));
const getPagination_1 = require("../../../libs/getPagination");
const getUserToken_1 = require("../../../libs/getUserToken");
const make_id_1 = require("../../../libs/make_id");
const product_model_1 = require("../../../models/product/product.model");
const product_model_2 = require("../../../models/shop/product/product.model");
const dataUserTK = (req) => {
    const { cookie } = req.headers;
    const bearer = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[0].toLowerCase();
    const token = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[1];
    const data_user = (0, getUserToken_1.getDataUser)(token, bearer);
    return data_user;
};
exports.dataUserTK = dataUserTK;
const getAllProductShop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, type } = req.query;
        const { cookie } = req.headers;
        const bearer = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[0].toLowerCase();
        const token = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[1];
        const data_user = (0, getUserToken_1.getDataUser)(token, bearer);
        const code_shop = (data_user === null || data_user === void 0 ? void 0 : data_user.payload.code_shop) || '';
        const dataCountProductShop = yield product_model_2.ProductShopModel.getCountAllProductShopModel({ code_shop: code_shop });
        yield product_model_2.ProductShopModel.getAllProductShopModel({ code_shop: code_shop, page: Number(page) || 1, type: type || '' }, (err, result) => {
            if (err) {
                res.json({
                    err: "Error"
                });
            }
            else {
                if (result) {
                    const dataPaging = {
                        count: Number(dataCountProductShop.rows[0].count) || 0,
                        rows: result.rows
                    };
                    const { tutorials, totalItems, totalPages, currentPage } = (0, getPagination_1.getPagingData)(dataPaging, Number(page) || 0, Number(config_1.default.table_product_shop_limit_show) || 10);
                    res.json({
                        totalPages,
                        totalItems,
                        limit: Number(config_1.default.table_product_shop_limit_show),
                        currentPage,
                        data: tutorials
                    });
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
exports.getAllProductShop = getAllProductShop;
const addProductShop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cookie } = req.headers;
        const bearer = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[0].toLowerCase();
        const token = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[1];
        const data_user = (0, getUserToken_1.getDataUser)(token, bearer);
        const dataAddProductSQL = [
            (0, make_id_1.makeId)(15),
            data_user === null || data_user === void 0 ? void 0 : data_user.payload.code_shop,
            req.body.image,
            req.body.name_product,
            req.body.price,
            req.body.quantity,
            0,
            (0, make_id_1.makeId)(15),
            req.body.code_product_type,
            0,
            req.body.discount,
            (0, make_id_1.makeId)(15),
            new Date(Date.now()).toISOString(),
            JSON.stringify(req.body.type_product),
            null,
            req.body.date_start || null,
            req.body.date_end || null,
            req.body.isShow,
            JSON.stringify(req.body.images),
            req.body.free_ship === 1 ? false : true,
            req.body.description,
            req.body.guide,
            req.body.return,
            req.body.note,
        ];
        console.log(dataAddProductSQL);
        yield product_model_2.ProductShopModel.addProductShopModel(dataAddProductSQL, (err, result) => {
            if (err) {
                res.json({
                    error: err
                });
            }
            else {
                if (result) {
                    res.json({
                        data: result,
                        message: 'Đăng sản phẩm thành công'
                    });
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
exports.addProductShop = addProductShop;
const getProductByCodeAndShop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cookie } = req.headers;
        const bearer = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[0].toLowerCase();
        const token = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[1];
        const data_user = (0, getUserToken_1.getDataUser)(token, bearer);
        const dataQuery = {
            code_product: req.query.code_product,
            code_shop: data_user === null || data_user === void 0 ? void 0 : data_user.payload.code_shop
        };
        yield product_model_2.ProductShopModel.getProductByCodeAndShopModel(dataQuery, (err, result) => {
            if (err) {
                res.json({
                    error: err
                });
            }
            else {
                if (result) {
                    res.json({
                        message: 'success',
                        data: result.rows
                    });
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
exports.getProductByCodeAndShop = getProductByCodeAndShop;
const getAllProductType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataUser = (0, exports.dataUserTK)(req);
        if (dataUser) {
            const code_shop = dataUser.payload.code_shop;
            yield product_model_1.ProductModel.getAllTypeProductByShopModel({ code_shop: code_shop }, (err, result) => {
                if (err) {
                    res.json({
                        error: err
                    });
                }
                else {
                    if (result) {
                        res.json({
                            data: result.rows
                        });
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
exports.getAllProductType = getAllProductType;
const removeProductByShop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code_product } = req.query;
        const dataUser = (0, exports.dataUserTK)(req);
        const code_shop = dataUser === null || dataUser === void 0 ? void 0 : dataUser.payload.code_shop;
        if (code_product) {
            yield product_model_2.ProductShopModel.removeProductByShop({
                code_product: code_product,
                code_shop: code_shop
            }, (err, result) => {
                if (err) {
                    res.json({
                        error: err
                    });
                }
                else {
                    if (result) {
                        if (result.rowCount === 1) {
                            res.json({
                                success: true,
                                message: 'Xóa dữ liệu thành công '
                            });
                        }
                        else {
                            res.json({
                                success: false,
                                message: 'Xóa dữ liệu không thành công '
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
exports.removeProductByShop = removeProductByShop;
const addTypeProductByShop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const dataUser = (0, exports.dataUserTK)(req);
        const dataSQL = {
            code_product_type: (0, make_id_1.makeId)(15),
            name_product_type: data.name_product_type,
            status: data.status,
            code_shop: dataUser === null || dataUser === void 0 ? void 0 : dataUser.payload.code_shop
        };
        console.log(dataSQL);
        yield product_model_2.ProductShopModel.addTypeProductModel(dataSQL, (err, result) => {
            if (err) {
                res.json({
                    error: err
                });
            }
            else {
                if (result) {
                    res.json({
                        data: result
                    });
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
exports.addTypeProductByShop = addTypeProductByShop;
