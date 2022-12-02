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
exports.getAllUserMessengerChatByShop = exports.getAllMessengerChatByCode = exports.sendMessengerChatShop = void 0;
const timeVietNam_1 = require(".././../../libs/timeVietNam");
const make_id_1 = require(".././../../libs/make_id");
const getUserToken_1 = require("../../../libs/getUserToken");
const chat_model_1 = require("../../../models/shop/chat/chat.model");
const dataUserTK = (req) => {
    const { cookie } = req.headers;
    const bearer = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[0].toLowerCase();
    const token = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[1];
    const data_user = (0, getUserToken_1.getDataUser)(token, bearer);
    return data_user;
};
const sendMessengerChatShop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const data_user = dataUserTK(req);
        const dataSQL = {
            code_chat: (0, make_id_1.makeId)(100),
            code_user: data.code_user,
            type_chat: '2',
            text_chat: data.text_chat,
            time_chat: (0, timeVietNam_1.timeVietNameYesterday)(),
            room_chat: (0, make_id_1.makeId)(100),
            code_shop: data_user === null || data_user === void 0 ? void 0 : data_user.payload.code_shop,
        };
        yield chat_model_1.ChatModelShop.sendMessengerChat(dataSQL, (err, result) => {
            if (err) {
                res.json({
                    error: err,
                });
            }
            else {
                if (result) {
                    if (result.rowCount > 0) {
                        res.json({
                            dataSQL: dataSQL,
                            messenger: 'Thành công',
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
exports.sendMessengerChatShop = sendMessengerChatShop;
const getAllMessengerChatByCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data_user = dataUserTK(req);
        const code_shop = data_user === null || data_user === void 0 ? void 0 : data_user.payload.code_shop;
        const { code_user } = req.query;
        yield chat_model_1.ChatModelShop.getAllMessengerChatByCodeUser({ code_user: code_user || '', code_shop: code_shop, limit: 20 }, (err, result) => {
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
exports.getAllMessengerChatByCode = getAllMessengerChatByCode;
const getAllUserMessengerChatByShop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data_shop = dataUserTK(req);
        const code_shop = data_shop === null || data_shop === void 0 ? void 0 : data_shop.payload.code_shop;
        yield chat_model_1.ChatModelShop.getAllUserMessengerByShopModel({ code_shop: code_shop }, (err, result) => {
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
exports.getAllUserMessengerChatByShop = getAllUserMessengerChatByShop;
