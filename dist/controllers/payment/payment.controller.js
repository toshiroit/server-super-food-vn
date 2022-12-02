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
exports.getAllPayment = void 0;
const payment_model_1 = require("../../models/payment/payment.model");
const getAllPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield payment_model_1.PaymentModel.getAllPayment((err, result) => {
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
    catch (err) {
        res.json({
            error: err
        });
    }
});
exports.getAllPayment = getAllPayment;
