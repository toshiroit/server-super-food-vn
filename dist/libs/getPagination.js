"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPagingData = exports.getPagination = void 0;
const getPagination = (page, limit) => {
    const limitResult = limit || 2;
    const offset = (page - 1) * limitResult;
    return { limit, offset };
};
exports.getPagination = getPagination;
const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: tutorials } = data;
    const currentPage = page ? page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, tutorials, totalPages, currentPage };
};
exports.getPagingData = getPagingData;
