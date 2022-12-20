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
exports.checkVoucherProductByVoucherShop = void 0;
const voucher_model_1 = require("../../models/voucher/voucher.model");
const checkVoucherProductByVoucherShop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataSQL = {
            code_product: JSON.parse(req.query.code_product || '') || '',
            code_voucher: req.query.code_w_voucher || '',
        };
        yield voucher_model_1.VoucherModel.checkVoucherProductByVoucherShopModel(dataSQL, (err, result) => {
            if (err) {
                res.json({
                    error: err,
                });
            }
            else {
                if (result) {
                    if (result.rows && result.rows.length > 0) {
                        res.json({
                            data: result.rows[0],
                        });
                    }
                    else {
                        res.status(400).json({
                            message: 'Ma giam gia khong ton tai',
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
exports.checkVoucherProductByVoucherShop = checkVoucherProductByVoucherShop;
