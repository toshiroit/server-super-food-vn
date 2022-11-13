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
exports.getAllCommentByProduct = exports.addNewComment = void 0;
const comment_model_1 = require("../../models/comment/comment.model");
const addNewComment = (req, res) => {
    try {
        const data = req.body;
    }
    catch (err) {
        res.json({
            error: err
        });
    }
};
exports.addNewComment = addNewComment;
const getAllCommentByProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield comment_model_1.CommentModel.getAllCommentByProductModel(req.query.code_product, (err, result) => {
            if (err) {
                res.json({
                    message: err
                });
            }
            else {
                if (!(result === null || result === void 0 ? void 0 : result.rows)) {
                    res.json({
                        message: "Bị lỗi "
                    });
                }
                else {
                    if (result.rowCount <= 0) {
                        res.json({
                            message: "Không có bình luận - đánh giá nào "
                        });
                    }
                    else if (result.rowCount > 0) {
                        res.json({
                            data: result
                        });
                    }
                    else {
                        res.json({
                            error: "Error"
                        });
                    }
                }
            }
        });
    }
    catch (err) {
        res.json({
            error: err
        });
    }
});
exports.getAllCommentByProduct = getAllCommentByProduct;
