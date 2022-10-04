"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataObjectFields = void 0;
const getDataObjectFields = (data) => {
    let result = '';
    Object.keys(data).map(item => {
        result += item;
        result += ',';
    });
    result = result.substring(0, result.length - 1);
    return result;
};
exports.getDataObjectFields = getDataObjectFields;
