"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { PORT, POSTGRES_TEST_HOST, POSTGRES_TEST_USER, POSTGRES_TEST_PASS, POSTGRES_TEST_DB, POSTGRES_TEST_PORT, BCRYPT_PASSWORD, SLAT_ROUNDS, MAILER_USER, MAILER_PASS, MAILER_HOST, MAILER_PORT, MAILER_SECURE, TOKEN_SECRET, DOMAIN_WEB_CLIENT, DOMAIN_WEB_CLIENT_SHOP, DOMAIN_ADMIN, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, REFRESH_TOKEN, FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_DATABASE_URL, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET, FIREBASE_MESSAING_SENDER_ID, FIREBASE_APP_ID, FIREBASE_MEASUREMENT_ID, SEARCH_PRODUCT_LIMIT_SHOW, ORDER_USER_LIMIT_SHOW, TABLE_PRODUCT_SHOP_LIMIT_SHOW, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_API_ENVIRONMENT_VARIABLE_URL, NODE_MAILER_USER, NODE_MAILER_PASS, NODE_MAILER_SMTP, NODE_MAILER_HOST, NODE_MAILER_PORT, NODE_MAILER_ENCRYPTION, } = process.env;
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
    refresh_token: REFRESH_TOKEN,
    domain_web_client: DOMAIN_WEB_CLIENT,
    domain_web_client_shop: DOMAIN_WEB_CLIENT_SHOP,
    domain_admin: DOMAIN_ADMIN,
    twilio_account_sid: TWILIO_ACCOUNT_SID,
    twilio_auth_token: TWILIO_AUTH_TOKEN,
    twilio_phone: TWILIO_PHONE,
    access_token_secret: ACCESS_TOKEN_SECRET,
    refresh_token_secret: REFRESH_TOKEN_SECRET,
    firebase_apiKey: FIREBASE_API_KEY,
    firebase_authDomain: FIREBASE_AUTH_DOMAIN,
    firebase_databaseURL: FIREBASE_DATABASE_URL,
    firebase_projectId: FIREBASE_PROJECT_ID,
    firebase_storageBucket: FIREBASE_STORAGE_BUCKET,
    firebase_messagingSenderId: FIREBASE_MESSAING_SENDER_ID,
    firebase_appId: FIREBASE_APP_ID,
    firebase_measurementId: FIREBASE_MEASUREMENT_ID,
    search_product_limit_show: SEARCH_PRODUCT_LIMIT_SHOW,
    order_user_limit_show: ORDER_USER_LIMIT_SHOW,
    table_product_shop_limit_show: TABLE_PRODUCT_SHOP_LIMIT_SHOW,
    cloudinary_cloud_name: CLOUDINARY_CLOUD_NAME,
    cloudinary_api_key: CLOUDINARY_API_KEY,
    cloudinary_api_secret: CLOUDINARY_API_SECRET,
    cloudinary_api_environment_variable_url: CLOUDINARY_API_ENVIRONMENT_VARIABLE_URL,
    node_mailer_user: NODE_MAILER_USER,
    node_mailer_pass: NODE_MAILER_PASS,
    node_mail_smtp: NODE_MAILER_SMTP,
    node_mail_host: NODE_MAILER_HOST,
    node_mail_encryption: NODE_MAILER_ENCRYPTION,
    node_mail_port: NODE_MAILER_PORT,
};
