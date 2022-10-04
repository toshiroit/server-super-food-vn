"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hasPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../config/config"));
const hasPassword = (password) => {
    const salt = parseInt(config_1.default.salt, 10);
    return bcrypt_1.default.hashSync(`${password}${config_1.default.pepper}`, salt);
};
exports.hasPassword = hasPassword;
const comparePassword = (password, hasPassword) => {
    const isPassword = bcrypt_1.default.compareSync(`${password}${config_1.default.pepper}`, hasPassword);
    return isPassword;
};
exports.comparePassword = comparePassword;
