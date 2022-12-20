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
exports.addNewNotifyShop = exports.getAllNotifyUser = void 0;
const data_user_1 = require("../../libs/data_user");
const make_id_1 = require("../../libs/make_id");
const timeVietNam_1 = require("../../libs/timeVietNam");
const notify_model_1 = require("../../models/notify/notify.model");
const getAllNotifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data_user = yield (0, data_user_1.dataUserTK)(req);
        notify_model_1.NotifyModel.getAllNotifyUser({ code_user: (data_user === null || data_user === void 0 ? void 0 : data_user.payload.code_user) || '' }, (err, result) => {
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
exports.getAllNotifyUser = getAllNotifyUser;
const addNewNotifyShop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code_shop, title, info } = req.body;
        const dataSQL = {
            code_notify_shop: (0, make_id_1.makeId)(15),
            code_shop: code_shop,
            title: title,
            info: info,
            code_type_notify: (0, make_id_1.makeId)(15),
            createdAt: (0, timeVietNam_1.timeVietNameYesterday)(),
        };
        yield notify_model_1.NotifyModel.addNewNotifyShopModel(dataSQL, (err, result) => {
            if (err) {
                res.json({
                    error: err,
                });
            }
            else {
                if (result) {
                    if (result.rowCount > 0) {
                        res.json({
                            message: 'Thành công',
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
});
exports.addNewNotifyShop = addNewNotifyShop;
