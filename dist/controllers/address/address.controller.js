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
exports.getAddressByUser = void 0;
const getUserToken_1 = require("../../libs/getUserToken");
const address_model_1 = require("../../models/address/address.model");
const getAddressByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cookie } = req.headers;
        const bearer = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[0].toLowerCase();
        const token = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[1];
        const dataUser = (0, getUserToken_1.getDataUser)(token, bearer);
        if (dataUser) {
            const dataSQL = {
                code_user: dataUser.payload.code_user
            };
            yield address_model_1.AddressModel.getAddressByUserModel(dataSQL, (err, result) => {
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
    }
    catch (err) {
        res.json({
            error: "Error"
        });
    }
});
exports.getAddressByUser = getAddressByUser;
