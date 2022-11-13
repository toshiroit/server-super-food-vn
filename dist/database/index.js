"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const config_1 = __importDefault(require("../config/config"));
const pool = new pg_1.Pool({
    host: config_1.default.host_db,
    database: config_1.default.database_db,
    user: config_1.default.user_db,
    password: config_1.default.pass_db,
    port: config_1.default.port_DB,
    // ssl: {
    //   rejectUnauthorized: false,
    // },
    max: 4,
});
pool.on('error', (error) => {
    console.error(error.message);
});
exports.default = pool;
