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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImages = exports.uploadImage = void 0;
const cloudinary_1 = __importDefault(require("../../utils/cloudinary/cloudinary"));
const cloudinaryUploadImages = (imageItem) => {
    const urls = [];
    cloudinary_1.default.uploader.upload(imageItem, {
        public_id: 'olympic_flag'
    }).then((result) => {
        const data = {
            is_upload: true,
            message: 'Tải lên thành công',
            data: result
        };
        urls.push(data);
        return urls;
    }).catch((err) => {
        return err;
    });
};
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const localFilePath = ((_a = req.file) === null || _a === void 0 ? void 0 : _a.path) || '';
        yield cloudinary_1.default.uploader.upload(localFilePath, {
            public_id: 'olympic_flag'
        }).then((result) => {
            res.json({
                is_upload: true,
                message: 'Tải lên thành công',
                data: result
            });
        }).catch((err) => {
            res.json({
                error: err
            });
        });
    }
    catch (err) {
        res.json({
            error: err
        });
    }
});
exports.uploadImage = uploadImage;
const uploadImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const images = req.files;
        const resultData = [];
        if (images) {
            for (const file of images) {
                yield cloudinary_1.default.uploader.upload(file.path, {
                    public_id: 'olympic_flag'
                }).then((result) => {
                    const data = {
                        is_upload: true,
                        message: 'Tải lên thành công',
                        data: result
                    };
                    resultData.push(data);
                }).catch((err) => {
                    res.json({
                        error: err
                    });
                });
            }
            res.json({
                data: resultData
            });
        }
    }
    catch (err) {
        res.json({
            error: err
        });
    }
});
exports.uploadImages = uploadImages;
