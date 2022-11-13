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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
const database_1 = __importDefault(require("./database"));
const routes_1 = __importDefault(require("./routes"));
const shop_1 = __importDefault(require("./routes/shop"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const config_1 = __importDefault(require("./config/config"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
// Create instance server
const app = (0, express_1.default)();
app.use(express_1.default.json({
    limit: '50mb'
}));
app.use(express_1.default.urlencoded({ limit: '50mb', extended: true }));
app.use(body_parser_1.default.json());
// HTTP request logger middleware
app.use((0, morgan_1.default)('common'));
// HTTP Security middleware
app.use((0, helmet_1.default)());
// Set limit upload 
// set cookies
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(__dirname));
// Change domain cors
app.use((0, cors_1.default)({
    origin: [
        config_1.default.domain_admin, config_1.default.domain_web_client, config_1.default.domain_web_client_shop,
        'https://super-food-vn.vercel.app',
        'http://localhost:3001',
        'https://admin-super-food.vercel.app'
    ],
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH', 'OPTIONS'],
    credentials: true,
    preflightContinue: false,
}));
/*
origin: [
      config.domain_admin, config.domain_web_client, config.domain_web_client_shop,
      'https://super-food-vn.vercel.app',
      'http://localhost:3001',
      'https://admin-super-food.vercel.app'
    ]

*/
// Apply the rate limiting middleware to all request
// app.use(
//   ratelimit({
//     // 15 minutes
//     windowMs: 15 * 60 * 1000,
//     max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
//     standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//     legacyHeaders: false, // Disable the `X-RateLimit-*` headers
//   })
// );
// Add routing for / path
app.use('/api', routes_1.default);
app.use('/api/v1/sp-shop', shop_1.default);
app.use(error_middleware_1.default);
app.listen(process.env.PORT || 8080, () => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.default.connect();
    console.log(`🚀 🚀  Server running into http://localhost:${process.env.PORT} 🚀  🚀 `);
}));
exports.default = app;
