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
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config/config"));
const transporter = nodemailer_1.default.createTransport({
    host: config_1.default.node_mail_host,
    port: Number(config_1.default.node_mail_port) || 587,
    auth: {
        user: config_1.default.node_mailer_user,
        pass: config_1.default.node_mailer_pass,
    },
    secure: false,
    tls: {
        rejectUnauthorized: false,
    },
});
const mainOptions = ({ from, to, subject, text, html }) => {
    const sendMailOptions = {
        from,
        to,
        subject,
        text,
        html,
    };
    return sendMailOptions;
};
const sendMail = ({ from, to, subject, text, html }) => __awaiter(void 0, void 0, void 0, function* () {
    return transporter.sendMail(mainOptions({ from, to, subject, text, html }));
});
exports.sendMail = sendMail;
