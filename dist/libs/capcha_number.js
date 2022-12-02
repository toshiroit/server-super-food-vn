"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCAPTCHACode = void 0;
const chars = '0123456789'.split('');
let length = 6;
const GetCAPTCHACode = () => {
    if (!length) {
        length = Math.floor(Math.random() * chars.length);
    }
    let str = '';
    for (let i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
};
exports.GetCAPTCHACode = GetCAPTCHACode;
