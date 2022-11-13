"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config/config"));
const refreshJWT = (user, callback) => {
    const timeSinchEpoch = new Date().getTime();
    var expirationTime = timeSinchEpoch + Number(3600) * 100000;
    var expirationTimeSeconds = 60 * 60 * 24;
    try {
        jsonwebtoken_1.default.sign(user, config_1.default.tokenSecret, {
            issuer: 'coolIssuer',
            algorithm: 'HS256',
            expiresIn: expirationTimeSeconds,
        }, (err, token) => {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, token);
            }
        });
    }
    catch (error) {
        callback(error, null);
    }
};
exports.default = refreshJWT;
