"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const config_1 = __importDefault(require("../../config/config"));
const app_1 = __importDefault(require("firebase/app"));
const firebaseConfig = {
    apiKey: config_1.default.firebase_apiKey,
    authDomain: config_1.default.firebase_authDomain,
    databaseURL: config_1.default.firebase_databaseURL,
    projectId: config_1.default.firebase_projectId,
    storageBucket: config_1.default.firebase_storageBucket,
    messagingSenderId: config_1.default.firebase_messagingSenderId,
    appId: config_1.default.firebase_appId,
    measurementId: config_1.default.firebase_measurementId
};
exports.app = app_1.default.initializeApp(firebaseConfig);
