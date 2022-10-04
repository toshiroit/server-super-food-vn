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
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
const database_1 = __importDefault(require("./database"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
// Create instance server
const app = (0, express_1.default)();
app.use(express_1.default.json());
// HTTP request logger middleware
app.use((0, morgan_1.default)('common'));
// HTTP Security middleware
app.use((0, helmet_1.default)());
// Apply the rate limiting middleware to all request
app.use((0, express_rate_limit_1.default)({
    // 15 minutes
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}));
// Add routing for / path
app.use('/api', routes_1.default);
app.use(error_middleware_1.default);
app.listen(process.env.PORT || 8080, () => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.default.connect();
    console.log(`🚀 🚀  Server running into http://localhost:${process.env.PORT} 🚀  🚀 `);
}));
exports.default = app;
