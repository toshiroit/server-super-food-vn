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
exports.searchProductByType = exports.listTextSearchProduct = void 0;
const config_1 = __importDefault(require("../../config/config"));
const getPagination_1 = require("../../libs/getPagination");
const product_model_1 = require("../../models/product/product.model");
const search_model_1 = require("../../models/search/search.model");
const listTextSearchProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { text } = req.query;
        const data = yield search_model_1.SearchModel.getListTextSearchProduct({ text: text || '' });
        if (data.rows.length > 0) {
            res.json({
                text: text,
                data: data.rows,
            });
        }
        else {
            res.json({
                message: 'Không có dữ liệu',
                data: data.rows,
            });
        }
    }
    catch (error) {
        res.json({
            error,
        });
    }
});
exports.listTextSearchProduct = listTextSearchProduct;
const searchProductByType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataQuery = {
            q: req.query.q.toLowerCase(),
            typeShow: req.query.typeShow,
            listShop: req.query.listShop,
            sort: Number(req.query.sort),
            page: req.query.page,
            size: req.query.size,
            open_shop: Boolean(req.query.open_shop),
            discount: Boolean(req.query.discount),
            free_ship: Boolean(req.query.free_ship),
            evaluate_top: Boolean(req.query.type_show),
            type_show: Number(req.query.type_show),
        };
        console.log('data : ', dataQuery);
        const dataCount = yield product_model_1.ProductModel.getCountProduct(dataQuery);
        yield product_model_1.ProductModel.getProductByQueryModel(dataQuery, (err, result) => {
            if (err) {
                res.json({
                    error: err,
                });
            }
            else {
                if (result) {
                    const dataPaging = {
                        count: Number(dataCount.rows[0].count) || 0,
                        rows: result.rows,
                    };
                    const { tutorials, totalItems, totalPages, currentPage } = (0, getPagination_1.getPagingData)(dataPaging, Number(dataQuery.page) || 1, Number(config_1.default.search_product_limit_show) || 30);
                    res.json({
                        totalItems,
                        totalPages,
                        currentPage,
                        limit: Number(config_1.default.search_product_limit_show),
                        data: tutorials,
                    });
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
exports.searchProductByType = searchProductByType;
