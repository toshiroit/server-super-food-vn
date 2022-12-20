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
exports.updateAddressUserByCode = exports.getDetailAddressUserByCode = exports.addAddressByUser = exports.getAddressByUser = void 0;
const getUserToken_1 = require("../../libs/getUserToken");
const address_model_1 = require("../../models/address/address.model");
const dataUserTK = (req) => {
    const { cookie } = req.headers;
    const bearer = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[0].toLowerCase();
    const token = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[1];
    const data_user = (0, getUserToken_1.getDataUser)(token, bearer);
    return data_user;
};
const getAddressByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cookie } = req.headers;
        const bearer = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[0].toLowerCase();
        const token = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[1];
        const dataUser = (0, getUserToken_1.getDataUser)(token, bearer);
        if (dataUser) {
            const dataSQL = {
                code_user: dataUser.payload.code_user,
            };
            yield address_model_1.AddressModel.getAddressByUserModel(dataSQL, (err, result) => {
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
    }
    catch (err) {
        res.json({
            error: 'Error',
        });
    }
});
exports.getAddressByUser = getAddressByUser;
const addAddressByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data_user = dataUserTK(req);
        if (data_user) {
            const dataSQL = req.body.data;
            dataSQL.code_user = data_user === null || data_user === void 0 ? void 0 : data_user.payload.code_user;
            const dataCheck = yield address_model_1.AddressModel.checkPhoneAddressIsEmptyByUser({
                code_user: dataSQL.code_user,
                phone: dataSQL.phone,
            });
            const dataCountAddress = yield address_model_1.AddressModel.checkCountAddressByUser({
                code_user: dataSQL.code_user,
            });
            const dataResult = {
                data: dataSQL,
            };
            if (dataSQL.status) {
                const dataUpdateStatus = {
                    code_user: dataSQL.code_user,
                    status: false,
                    code_address: dataSQL.code_address,
                };
                const dataUpdate = yield address_model_1.AddressModel.updateStatusAddressByUserModel(dataUpdateStatus);
                if (Number(dataCountAddress.rows[0].count) < 6) {
                    if (Number(dataCheck.rows[0].count) === 0) {
                        yield address_model_1.AddressModel.addAddressByUserModel({ item: dataResult }, (err, result) => {
                            if (err) {
                                res.json({
                                    error: err,
                                });
                            }
                            else {
                                if (result) {
                                    if (result.rowCount > 0) {
                                        res.json({
                                            message: 'Thêm thành công ',
                                        });
                                    }
                                    else {
                                        res.json({
                                            message: 'Thêm không thành công ',
                                        });
                                    }
                                }
                            }
                        });
                    }
                    else {
                        res.status(400).json({
                            error: 'Số điện thoại đã tồn tại',
                        });
                    }
                }
                else {
                    res.status(400).json({
                        error: 'Cập nhật không thành công ',
                    });
                }
            }
            else {
                if (Number(dataCountAddress.rows[0].count) < 6) {
                    if (Number(dataCheck.rows[0].count) === 0) {
                        yield address_model_1.AddressModel.addAddressByUserModel({ item: dataResult }, (err, result) => {
                            if (err) {
                                res.json({
                                    error: err,
                                });
                            }
                            else {
                                if (result) {
                                    if (result.rowCount > 0) {
                                        res.json({
                                            message: 'Thêm thành công ',
                                        });
                                    }
                                    else {
                                        res.json({
                                            message: 'Thêm không thành công ',
                                        });
                                    }
                                }
                            }
                        });
                    }
                    else {
                        res.status(400).json({
                            error: 'Số điện thoại đã tồn tại',
                        });
                    }
                }
                else {
                    res.status(400).json({
                        error: 'Số lượng địa chỉ đã có tối đa - không thể thêm mơi',
                    });
                }
            }
        }
    }
    catch (err) {
        res.json({
            error: err,
        });
    }
});
exports.addAddressByUser = addAddressByUser;
const getDetailAddressUserByCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data_user = dataUserTK(req);
        const dataSQL = {
            code_user: data_user === null || data_user === void 0 ? void 0 : data_user.payload.code_user,
            code_address: req.query.code_address || '',
        };
        yield address_model_1.AddressModel.getDetailAddressUserByCode(dataSQL, (err, result) => {
            if (err) {
                res.json({
                    error: err,
                });
            }
            else {
                if (result) {
                    if (result.rows.length > 0) {
                        res.json({
                            data: result.rows[0],
                        });
                    }
                    else {
                        res.status(400).json({
                            message: 'Không tồn tại địa chỉ',
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
exports.getDetailAddressUserByCode = getDetailAddressUserByCode;
const updateAddressUserByCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data_user = dataUserTK(req);
        const dataSQL = req.body;
        dataSQL.data.code_user = data_user === null || data_user === void 0 ? void 0 : data_user.payload.code_user;
        if (dataSQL.data.status) {
            const dataUpdateStatus = {
                code_user: dataSQL.data.code_user,
                status: false,
                code_address: dataSQL.data.code_address,
            };
            yield address_model_1.AddressModel.updateStatusAddressByUserModel(dataUpdateStatus);
        }
        yield address_model_1.AddressModel.updateAddressUserByCodeModel(dataSQL, (err, result) => {
            if (err) {
                res.json({
                    error: err,
                });
            }
            else {
                if (result) {
                    if (result.rowCount > 0) {
                        res.json({
                            code_address: dataSQL.data.code_address,
                            message: 'Cập nhật địa chỉ thành công ',
                        });
                    }
                    else {
                        res.status(400).json({
                            code_address: dataSQL.data.code_address,
                            message: 'Không thể cập nhật đỉa chỉ',
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
exports.updateAddressUserByCode = updateAddressUserByCode;
