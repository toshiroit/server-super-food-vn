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
exports.searchProductByType = void 0;
const config_1 = __importDefault(require("../../config/config"));
const getPagination_1 = require("../../libs/getPagination");
const product_model_1 = require("../../models/product/product.model");
const searchProductByType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataQuery = {
            q: req.query.q.toLowerCase(),
            typeShow: req.query.typeShow,
            listShop: req.query.listShop,
            sort: req.query.sort,
            page: req.query.page,
            size: req.query.size,
        };
        const dataCount = yield product_model_1.ProductModel.getCountProduct(dataQuery);
        yield product_model_1.ProductModel.getProductByQueryModel(dataQuery, (err, result) => {
            if (err) {
                res.json({
                    error: err
                });
            }
            else {
                if (result) {
                    const dataPaging = {
                        count: Number(dataCount.rows[0].count) || 0,
                        rows: result.rows
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
            error: "Error "
        });
    }
});
exports.searchProductByType = searchProductByType;
