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
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../../config/config"));
const smtp = {
    host: config_1.default.mailer_host,
    user: config_1.default.mailer_user,
    pass: config_1.default.mailer_pass,
    port: config_1.default.mailer_port,
    secure: config_1.default.mailer_secure,
};
console.log(smtp);
const transporter = nodemailer_1.default.createTransport(Object.assign(Object.assign({}, smtp), { secure: false, auth: {
        user: smtp.user,
        pass: smtp.pass,
    } }));
function sendEmail(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        transporter.sendMail(payload, (err, info) => {
            if (err) {
                console.log('Error sending Email', err);
            }
            console.log(`Preview URL : ${nodemailer_1.default.getTestMessageUrl(info)}`);
        });
    });
}
exports.default = sendEmail;
