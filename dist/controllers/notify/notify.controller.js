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
exports.addNewNotifyShop = void 0;
const make_id_1 = require("../../libs/make_id");
const timeVietNam_1 = require("../../libs/timeVietNam");
const notify_model_1 = require("../../models/notify/notify.model");
const addNewNotifyShop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code_shop, title, info } = req.body;
        const dataSQL = {
            code_notify_shop: (0, make_id_1.makeId)(15),
            code_shop: code_shop,
            title: title,
            info: info,
            code_type_notify: (0, make_id_1.makeId)(15),
            createdAt: (0, timeVietNam_1.timeVietNameYesterday)()
        };
        yield notify_model_1.notifyModel.addNewNotifyShopModel(dataSQL, (err, result) => {
            if (err) {
                res.json({
                    error: err
                });
            }
            else {
                if (result) {
                    if (result.rowCount > 0) {
                        res.json({
                            message: 'Thành công'
                        });
                    }
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
exports.addNewNotifyShop = addNewNotifyShop;
