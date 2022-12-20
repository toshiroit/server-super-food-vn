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
exports.getShopByNameAndCode = void 0;
const getPagination_1 = require("../../../libs/getPagination");
const search_model_1 = require("../../../models/shop/search/search.model");
const getShopByNameAndCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataSQL = {
            page: Number(req.query.page) || 1,
            code_shop: req.query.code_shop || '',
            name_shop: req.query.name_shop || '',
        };
        const data_countShop = yield search_model_1.SearchModel.getCountShopModelByNameAndCode(dataSQL);
        console.log(data_countShop.rows[0]);
        yield search_model_1.SearchModel.getShopModelByNameAndCode(dataSQL, (err, result) => {
            if (err) {
                res.json({
                    err,
                });
            }
            else {
                if (result) {
                    const dataPaging = {
                        count: Number(data_countShop.rows[0].count) || 0,
                        rows: result.rows,
                    };
                    const { currentPage, totalItems, totalPages, tutorials } = (0, getPagination_1.getPagingData)(dataPaging, dataSQL.page, 10);
                    res.json({
                        totalPages,
                        totalItems,
                        limit: 10,
                        currentPage,
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
exports.getShopByNameAndCode = getShopByNameAndCode;
