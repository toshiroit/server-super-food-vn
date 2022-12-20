"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTextBadWord = void 0;
const data_1 = require("../json/bad-words/data");
const checkTextBadWord = (value) => {
    let result = false;
    data_1.bad_words.vi.map(item => {
        if (item.toLowerCase() === value) {
            return (result = true);
        }
    });
    return result;
};
exports.checkTextBadWord = checkTextBadWord;
