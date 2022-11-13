"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinaryDB = exports.uploadFile = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const config_1 = __importDefault(require("../config/config"));
const multer_1 = __importDefault(require("multer"));
const cloudinaryDB = cloudinary_1.default.v2.config({
    cloud_name: config_1.default.cloudinary_cloud_name,
    api_key: config_1.default.cloudinary_api_key,
    api_secret: config_1.default.cloudinary_api_secret
});
exports.cloudinaryDB = cloudinaryDB;
const storage = multer_1.default.diskStorage({
    filename(req, file, callback) {
        callback(null, new Date().toISOString() + '-' + file.originalname);
    },
});
const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        callback(null, true);
    }
    else {
        callback(null, false);
    }
};
const uploadFile = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 1024 * 1024 },
    fileFilter: fileFilter,
});
exports.uploadFile = uploadFile;
