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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_model_1 = __importDefault(require("../../models/user/user.model"));
class UserController extends user_model_1.default {
}
exports.UserController = UserController;
_a = UserController;
UserController.registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) { }
});
UserController.createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () { });
/**
 *
 * @param req
 * @param res
 * @param next
 * @returns => return json
 */
UserController.getAllUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valueQuery = {
            table: 'users',
            obj: {
                condition: null,
            },
            field: null,
            value: [],
        };
        // await UserModel.getAllNoField(valueQuery, (err, result) => {
        //   if (err) {
        //     res.json({ error: err });
        //   } else {
        //     res.json({ data: result?.rows });
        //   }
        // });
    }
    catch (error) {
        throw new Error('Error');
    }
});
