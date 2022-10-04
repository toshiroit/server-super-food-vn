"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { PORT, POSTGRES_TEST_HOST, POSTGRES_TEST_USER, POSTGRES_TEST_PASS, POSTGRES_TEST_DB, POSTGRES_TEST_PORT, BCRYPT_PASSWORD, SLAT_ROUNDS, MAILER_USER, MAILER_PASS, MAILER_HOST, MAILER_PORT, MAILER_SECURE, TOKEN_SECRET, } = process.env;
exports.default = {
    port: PORT,
    host_db: POSTGRES_TEST_HOST,
    user_db: POSTGRES_TEST_USER,
    pass_db: POSTGRES_TEST_PASS,
    database_db: POSTGRES_TEST_DB,
    port_DB: POSTGRES_TEST_PORT,
    pepper: BCRYPT_PASSWORD,
    salt: SLAT_ROUNDS,
    mailer_host: MAILER_HOST,
    mailer_user: MAILER_USER,
    mailer_pass: MAILER_PASS,
    mailer_port: MAILER_PORT,
    mailer_secure: MAILER_SECURE,
    tokenSecret: TOKEN_SECRET,
};
