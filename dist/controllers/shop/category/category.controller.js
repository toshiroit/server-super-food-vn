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
exports.getAllCategoryByShop = exports.getCategoryProductShop = void 0;
const getUserToken_1 = require("../../../libs/getUserToken");
const category_model_1 = require("../../../models/shop/category/category.model");
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
            limit: ''
        };
        yield category_model_1.CategoryModel.getCategoryProductShopModel(dataSQL, (err, result) => {
            if (err) {
                res.json({
                    error: err
                });
            }
            else {
                if (result) {
                    const dataPaging = {
                        count: 0,
                        rows: result.rows
                    };
                    res.json({
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
                    error: err
                });
            else if (result)
                res.json({
                    data: result.rows
                });
        });
    }
    catch (err) {
        res.json({
            error: "ERROR"
        });
    }
});
exports.getAllCategoryByShop = getAllCategoryByShop;
