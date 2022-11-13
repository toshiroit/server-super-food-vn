"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCAPTCHACode = void 0;
var chars = '0123456789'.split('');
var length = 6;
const GetCAPTCHACode = () => {
    if (!length) {
        length = Math.floor(Math.random() * chars.length);
    }
    var str = '';
    for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
};
exports.GetCAPTCHACode = GetCAPTCHACode;
