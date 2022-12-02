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
exports.getAllProductByNewShop = exports.getAllProductByPayTop = exports.getAllProductByTop = exports.getAllProductByShop = exports.productGetByNameOrCode = exports.productGetAll = void 0;
const product_model_1 = require("../../models/product/product.model");
const productGetAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, type } = req.query;
    try {
        const dataQuery = {
            limit: Number(limit) || 6,
            typeSort: type || ''
        };
        yield product_model_1.ProductModel.getAllProductModel(dataQuery, (err, result) => {
            if (err) {
                res.json({
                    error: err,
                });
            }
            else {
                if (result) {
                    res.json({
                        quality: result.rows.length,
                        type: dataQuery.typeSort,
                        data: result.rows,
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
exports.productGetAll = productGetAll;
const productGetByNameOrCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, size, title } = req.query;
    const data = {
        code: req.query.code || null,
        name: req.query.name || null,
        page: page || null,
        size: size || null,
        title: title || null
    };
    try {
        yield product_model_1.ProductModel.getProductDetailModel(data, (err, result) => {
            if (err) {
                res.json({
                    message: err
                });
            }
            else {
                if (result) {
                    if (result.rowCount > 0) {
                        res.status(200).json({
                            rowcount: result.rowCount,
                            data: result
                        });
                    }
                    else if (result.rowCount <= 0) {
                        res.status(200).json({
                            message: 'Không có sản phẩm '
                        });
                    }
                }
                else {
                    res.json({
                        error: "NOT DATA"
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
exports.productGetByNameOrCode = productGetByNameOrCode;
const getAllProductByShop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit, code_shop } = req.query;
        const dataSQL = {
            limit: limit || '6',
            code_shop: code_shop || ''
        };
        yield product_model_1.ProductModel.getAllProductByShopModel(dataSQL, (err, result) => {
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
    catch (err) {
        res.json({
            error: "Error"
        });
    }
});
exports.getAllProductByShop = getAllProductByShop;
const getAllProductByTop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit } = req.query;
        yield product_model_1.ProductModel.getAllProductByTopModel({ limit: limit }, (err, result) => {
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
    catch (err) {
        res.json({
            error: "Error"
        });
    }
});
exports.getAllProductByTop = getAllProductByTop;
const getAllProductByPayTop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit } = req.query;
        yield product_model_1.ProductModel.getAllProductByPayTop({ limit: limit }, (err, result) => {
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
    catch (err) {
        res.json({
            error: "Error"
        });
    }
});
exports.getAllProductByPayTop = getAllProductByPayTop;
const getAllProductByNewShop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit } = req.query;
        yield product_model_1.ProductModel.getAllProductByNewShop({ limit: limit }, (err, result) => {
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
    catch (err) {
        res.json({
            error: "Error"
        });
    }
});
exports.getAllProductByNewShop = getAllProductByNewShop;
