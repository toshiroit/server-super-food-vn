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
exports.getAllMessengerChatByCode = exports.sendMessengerChat = void 0;
const timeVietNam_1 = require("./../../libs/timeVietNam");
const make_id_1 = require("./../../libs/make_id");
const chat_model_1 = require("./../../models/chat/chat.model");
const getUserToken_1 = require("../../libs/getUserToken");
const dataUserTK = (req) => {
    const { cookie } = req.headers;
    const bearer = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[0].toLowerCase();
    const token = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[1];
    const data_user = (0, getUserToken_1.getDataUser)(token, bearer);
    return data_user;
};
const sendMessengerChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { text_chat, type_chat, code_shop } = req.body;
        const data_user = dataUserTK(req);
        const dataSQL = {
            code_chat: (0, make_id_1.makeId)(100),
            code_user: data_user === null || data_user === void 0 ? void 0 : data_user.payload.code_user,
            type_chat: '1',
            text_chat,
            time_chat: (0, timeVietNam_1.timeVietNameYesterday)(),
            room_chat: (0, make_id_1.makeId)(100),
            code_shop,
        };
        yield chat_model_1.ChatModel.sendMessengerChat(dataSQL, (err, result) => {
            if (err) {
                res.json({
                    error: err,
                });
            }
            else {
                if (result) {
                    if (result.rowCount > 0) {
                        res.json({
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
exports.sendMessengerChat = sendMessengerChat;
const getAllMessengerChatByCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data_user = dataUserTK(req);
        const { code_shop } = req.query;
        const code_user = data_user === null || data_user === void 0 ? void 0 : data_user.payload.code_user;
        yield chat_model_1.ChatModel.getAllMessengerChatByCodeUser({ code_user: code_user, code_shop: code_shop || '', limit: 20 }, (err, result) => {
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
