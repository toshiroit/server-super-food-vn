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
exports.getAllCategoryByShop = exports.getCategoryProductShop = exports.addNewCategoryByShop = exports.updateCategoryByShop = exports.removeCategoryByShop = void 0;
const getUserToken_1 = require("../../../libs/getUserToken");
const make_id_1 = require("../../../libs/make_id");
const category_model_1 = require("../../../models/shop/category/category.model");
const dataUserTK = (req) => {
    const { cookie } = req.headers;
    const bearer = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[0].toLowerCase();
    const token = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[1];
    const data_user = (0, getUserToken_1.getDataUser)(token, bearer);
    return data_user;
};
const removeCategoryByShop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data_user = yield dataUserTK(req);
        const dataSQL = {
            category_code: req.query.category_code || '',
            code_shop: data_user === null || data_user === void 0 ? void 0 : data_user.payload.code_shop,
        };
        yield category_model_1.CategoryModel.removeCategoryShopModel(dataSQL, (err, result) => {
            if (err) {
                res.json({
                    error: err,
                });
            }
            else {
                if (result) {
                    if (result.rowCount > 0) {
                        res.status(200).json({
                            message: 'Xoá thành công ',
                        });
                    }
                    else {
                        res.status(400).json({
                            message: 'Lỗi ',
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
exports.removeCategoryByShop = removeCategoryByShop;
const updateCategoryByShop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data_user = yield dataUserTK(req);
        const data_SQL = {
            code_shop: data_user === null || data_user === void 0 ? void 0 : data_user.payload.code_shop,
            name_category: req.body.category_name,
            info_category: req.body.category_info,
            status_category: Number(req.body.category_status) === 1 ? true : false,
            image: req.body.category_image,
            category_code: req.body.category_code || '',
        };
        yield category_model_1.CategoryModel.updateCategoryByShopModel(data_SQL, (err, result) => {
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
                        res.status(400).json({
                            message: 'Cập nhật không thành công',
                        });
                    }
                }
            }
        });
    }
    catch (error) {
        res.json({
            error: error,
        });
    }
});
exports.updateCategoryByShop = updateCategoryByShop;
const addNewCategoryByShop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data_user = yield dataUserTK(req);
        const dataSQL = {
            category_code: (0, make_id_1.makeId)(15),
            code_shop: data_user === null || data_user === void 0 ? void 0 : data_user.payload.code_shop,
            name_category: req.body.category_name,
            info_category: req.body.category_info,
            status_category: Number(req.body.category_status || -1) === -1 ? false : true,
            image: req.body.category_image,
        };
        const check_name_category = yield category_model_1.CategoryModel.checkNameCategoryShopModel(dataSQL);
        if (check_name_category.rows[0] && check_name_category.rows[0].count === '0') {
            yield category_model_1.CategoryModel.addNewCategoryByShopModel(dataSQL, (err, result) => {
                if (err) {
                    res.json({
                        error: err,
                    });
                }
                else {
                    if (result) {
                        if (result.rowCount > 0) {
                            res.json({
                                message: 'Thêm thành công',
                            });
                        }
                        else {
                            res.status(400).json({
                                message: 'Thêm không thành công',
                            });
                        }
                    }
                }
            });
        }
        else {
            res.status(400).json({
                message: 'Tên danh mục đã tồn tại',
            });
        }
    }
    catch (error) {
        res.json({
            error,
        });
    }
});
exports.addNewCategoryByShop = addNewCategoryByShop;
const getCategoryProductShop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page } = req.query;
        const { cookie } = req.headers;
        const bearer = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[0].toLowerCase();
        const token = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[1];
        const data_user = (0, getUserToken_1.getDataUser)(token, bearer);
        const dataSQL = {
            code_shop: (data_user === null || data_user === void 0 ? void 0 : data_user.payload.code_shop) || '',
            page: page,
            limit: '',
        };
        yield category_model_1.CategoryModel.getCategoryProductShopModel(dataSQL, (err, result) => {
            if (err) {
                res.json({
                    error: err,
                });
            }
            else {
                if (result) {
                    const dataPaging = {
                        count: 0,
                        rows: result.rows,
                    };
                    res.json({
                        data: result.rows,
                    });
                }
            }
        });
    }
    catch (err) {
        res.json({
            error: 'Error',
        });
    }
});
exports.getCategoryProductShop = getCategoryProductShop;
const getAllCategoryByShop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cookie } = req.headers;
        const bearer = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[0].toLowerCase();
        const token = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[1];
        const data_user = (0, getUserToken_1.getDataUser)(token, bearer);
        const code_shop = (data_user === null || data_user === void 0 ? void 0 : data_user.payload.code_shop) || '';
        yield category_model_1.CategoryModel.getAllCategoryByShopModel({ code_shop: code_shop }, (err, result) => {
            if (err)
                res.json({
                    error: err,
                });
            else if (result)
                res.json({
                    data: result.rows,
                });
        });
    }
    catch (err) {
        res.json({
            error: 'ERROR',
        });
    }
});
exports.getAllCategoryByShop = getAllCategoryByShop;
