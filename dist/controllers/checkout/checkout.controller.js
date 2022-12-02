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
exports.checkoutUser = exports.dataUserTK = void 0;
const getUserToken_1 = require("../../libs/getUserToken");
const checkout_model_1 = require("../../models/checkout/checkout.model");
const dataUserTK = (req) => {
    const { cookie } = req.headers;
    const bearer = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[0].toLowerCase();
    const token = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[1];
    const data_user = (0, getUserToken_1.getDataUser)(token, bearer);
    return data_user;
};
exports.dataUserTK = dataUserTK;
const checkoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data_user = (0, exports.dataUserTK)(req);
        const dataSQL = {
            data_product: req.body.data_product,
            data_user: data_user === null || data_user === void 0 ? void 0 : data_user.payload
        };
        yield checkout_model_1.CheckoutModel.checkoutOrderUserModel(dataSQL, (err, result) => {
            if (err) {
                res.json({
                    error: err
                });
            }
            else {
                if (result) {
                    res.json({
                        status: 200,
                        data: result,
                        message: 'Đơn hàng đã đặt thành công'
                    });
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
exports.checkoutUser = checkoutUser;
