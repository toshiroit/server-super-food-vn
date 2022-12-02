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
exports.addEvaluateByProduct = exports.checkEvaluateByProductUserOrder = void 0;
const getUserToken_1 = require("../../libs/getUserToken");
const make_id_1 = require("../../libs/make_id");
const timeVietNam_1 = require("../../libs/timeVietNam");
const evaluate_model_1 = require("../../models/evaluate/evaluate.model");
const dataUserTK = (req) => {
    const { cookie } = req.headers;
    const bearer = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[0].toLowerCase();
    const token = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[1];
    const data_user = (0, getUserToken_1.getDataUser)(token, bearer);
    return data_user;
};
const checkEvaluateByProductUserOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { code_order, code_product } = req.query;
        const data_user = dataUserTK(req);
        const dataSQL = {
            code_order: code_order || '',
            code_product: code_product || '',
            code_user: (data_user === null || data_user === void 0 ? void 0 : data_user.payload.code_user) || '',
        };
        const is_check = yield evaluate_model_1.EvaluateModel.checkEvaluateByProductUserOrderModel(dataSQL);
        if (((_a = is_check.rows[0]) === null || _a === void 0 ? void 0 : _a.count) === 0) {
            res.status(200).json({
                is_evaluate: false,
            });
        }
        else {
            res.status(200).json({
                code_product: code_product,
                is_evaluate: true,
            });
        }
    }
    catch (err) {
        res.json({
            error: err,
        });
    }
});
exports.checkEvaluateByProductUserOrder = checkEvaluateByProductUserOrder;
const addEvaluateByProduct = (req, res) => {
    try {
        const { code_product, evaluate_product, evaluate_ship, evaluate_progress, text, images, code_order } = req.body;
        const data_user = dataUserTK(req);
        const dataSQL = {
            code_evaluate: (0, make_id_1.makeId)(15),
            code_user: (data_user === null || data_user === void 0 ? void 0 : data_user.payload.code_user) || '',
            code_product: code_product,
            evaluate_product,
            evaluate_ship,
            evaluate_progress,
            images,
            text,
            createdAt: (0, timeVietNam_1.timeVietNameYesterday)(),
            code_order,
        };
        evaluate_model_1.EvaluateModel.addEvaluateByProductModel(dataSQL, (err, result) => {
            if (err) {
                res.json({
                    error: err,
                });
            }
            else {
                if (result) {
                    if (result.rowCount > 0) {
                        res.json({
                            message: 'Đánh giá thành công ',
                        });
                    }
                    else {
                        res.status(400).json({
                            message: 'Bạn đã đánh giá sản phẩm này rồi : ERROR F400',
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
};
exports.addEvaluateByProduct = addEvaluateByProduct;
