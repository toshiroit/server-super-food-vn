"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.endtenMinute = exports.timeVietNameYesterday = void 0;
const timeVietNameYesterday = () => {
    const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
    const localISOTime = new Date(Date.now() - tzoffset).toISOString().slice(0, -1);
    return localISOTime;
};
exports.timeVietNameYesterday = timeVietNameYesterday;
const endtenMinute = () => {
    const tzoffset = new Date().getTimezoneOffset() * 60300; //offset in milliseconds
    const localISOTime = new Date(Date.now() - tzoffset).toISOString().slice(0, -1);
    return localISOTime;
};
exports.endtenMinute = endtenMinute;
