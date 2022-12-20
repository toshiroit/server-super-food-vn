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
exports.getDetailVoucherShopByCode = exports.removeVoucherShopByCode = exports.getAllVoucher = exports.addNewVoucherByShop = exports.updateVoucherByShop = void 0;
const data_user_1 = require("../../../libs/data_user");
const make_id_1 = require("../../../libs/make_id");
const timeVietNam_1 = require("../../../libs/timeVietNam");
const voucher_model_1 = require("../../../models/shop/voucher/voucher.model");
const updateVoucherByShop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data_user = yield (0, data_user_1.dataUserTK)(req);
        const dataSQL = {
            code_voucher: req.body.code_voucher,
            name_voucher: req.body.name_voucher,
            price_voucher: req.body.price_voucher,
            code_type_voucher: req.body.code_type_voucher,
            description: req.body.description,
            code_w_voucher: req.body.code_w_voucher,
            time_start: req.body.time_start,
            time_end: req.body.time_end,
            updatedat: (0, timeVietNam_1.timeVietNameFullTime)(),
            quality: req.body.quality,
            code_shop: data_user === null || data_user === void 0 ? void 0 : data_user.payload.code_shop,
            type_price: req.body.type_price,
            code_product: req.body.code_product,
            createdat: '',
        };
        yield voucher_model_1.VoucherModel.updateDataVoucherModel(dataSQL, (err, result) => {
            if (err) {
                res.json({
                    error: err,
                });
            }
            else {
                if (result) {
                    if (result.rowCount > 0) {
                        res.json({
                            message: 'Cập nhật thành công',
                        });
                    }
                    else {
                        res.status(400).json({
                            message: 'Cập nhật không thành công',
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
exports.updateVoucherByShop = updateVoucherByShop;
const addNewVoucherByShop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data_user = (0, data_user_1.dataUserTK)(req);
        const dataSQL = {
            code_voucher: (0, make_id_1.makeId)(15),
            name_voucher: req.body.name_voucher,
            price_voucher: req.body.price_voucher,
            code_type_voucher: req.body.code_type_voucher,
            description: req.body.description,
            code_w_voucher: req.body.code_w_voucher,
            time_start: req.body.time_start,
            time_end: req.body.time_end,
            createdat: (0, timeVietNam_1.timeVietNameFullTime)(),
            quality: req.body.quality,
            code_shop: data_user === null || data_user === void 0 ? void 0 : data_user.payload.code_shop,
            type_price: req.body.type_price,
            code_product: req.body.code_product,
        };
        yield voucher_model_1.VoucherModel.addNewVoucherModel(dataSQL, (err, result) => {
            if (err) {
                res.json({
                    error: err,
                });
            }
            else {
                if (result) {
                    if (result.rowCount > 0) {
                        res.json({
                            message: 'Thêm thành công',
                        });
                    }
                    else {
                        res.status(400).json({
                            message: 'Thêm không thành công - !Lỗi',
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
exports.addNewVoucherByShop = addNewVoucherByShop;
const getAllVoucher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data_user = (0, data_user_1.dataUserTK)(req);
        const { type_voucher, name_voucher, time_start, time_end, status } = req.query;
        const dataFilter = {
            name_voucher: name_voucher,
            type_voucher: type_voucher,
            time_start: time_start,
            time_end: time_end,
            status: Boolean(status),
        };
        console.log(req.query);
        const code_shop = (data_user === null || data_user === void 0 ? void 0 : data_user.payload.code_shop) || '';
        yield voucher_model_1.VoucherModel.getAllVoucherModel({ code_shop, data_filter: dataFilter }, (err, result) => {
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
exports.getAllVoucher = getAllVoucher;
const removeVoucherShopByCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data_user = yield (0, data_user_1.dataUserTK)(req);
        const dataSQL = {
            code_shop: data_user === null || data_user === void 0 ? void 0 : data_user.payload.code_shop,
            code_voucher: req.query.code_voucher || '',
        };
        yield voucher_model_1.VoucherModel.removeDataVoucherModel(dataSQL, (err, result) => {
            if (err) {
                res.json({
                    error: err,
                });
            }
            else {
                if (result) {
                    res.json({
                        message: 'OK',
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
exports.removeVoucherShopByCode = removeVoucherShopByCode;
const getDetailVoucherShopByCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const code_shop = (_a = (0, data_user_1.dataUserTK)(req)) === null || _a === void 0 ? void 0 : _a.payload.code_shop;
        const dataSQL = {
            code_shop,
            code_voucher: req.query.code_voucher || '',
        };
        yield voucher_model_1.VoucherModel.getDetailVoucherModel(dataSQL, (err, result) => {
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
exports.getDetailVoucherShopByCode = getDetailVoucherShopByCode;
