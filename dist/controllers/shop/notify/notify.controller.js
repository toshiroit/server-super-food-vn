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
exports.getAllNotifyByShop = exports.getDetailNotifyByShop = void 0;
const getUserToken_1 = require("../../../libs/getUserToken");
const notify_model_1 = require("../../../models/shop/notify/notify.model");
const dataUserTK = (req) => {
    const { cookie } = req.headers;
    const bearer = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[0].toLowerCase();
    const token = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[1];
    const data_user = (0, getUserToken_1.getDataUser)(token, bearer);
    return data_user;
};
const getDetailNotifyByShop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data_user = yield dataUserTK(req);
        const dataSQL = {
            code_shop: data_user === null || data_user === void 0 ? void 0 : data_user.payload.code_shop,
            code_notify: req.query.code_notify || '',
        };
        yield notify_model_1.NotifyShopModel.getDetailNotifyByShopModel(dataSQL, (err, result) => {
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
    catch (error) {
        res.json({
            error,
        });
    }
});
exports.getDetailNotifyByShop = getDetailNotifyByShop;
const getAllNotifyByShop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit, type } = req.query;
        const data_user = dataUserTK(req);
        const code_shop = data_user === null || data_user === void 0 ? void 0 : data_user.payload.code_shop;
        yield notify_model_1.NotifyShopModel.getAllNotifyByShopModel({ code_shop, limit: Number(limit) || 15, type: Number(type) }, (err, result) => {
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
exports.getAllNotifyByShop = getAllNotifyByShop;
