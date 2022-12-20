"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataUserTK = void 0;
const getUserToken_1 = require("./getUserToken");
const dataUserTK = (req) => {
    const { cookie } = req.headers;
    const bearer = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[0].toLowerCase();
    const token = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[1];
    const data_user = (0, getUserToken_1.getDataUser)(token, bearer);
    return data_user;
};
exports.dataUserTK = dataUserTK;
