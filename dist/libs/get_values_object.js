"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataObjectValues = void 0;
const getDataObjectValues = (data) => {
    let result = '';
    Object.values(data).map(item => {
        if (typeof item === 'boolean') {
            result += `${item}`;
        }
        else {
            result += `'${item}'`;
        }
        result += ',';
    });
    result = result.substring(0, result.length - 1);
    return result;
};
exports.getDataObjectValues = getDataObjectValues;
