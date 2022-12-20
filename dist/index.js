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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
const database_1 = __importDefault(require("./database"));
const routes_1 = __importDefault(require("./routes"));
const shop_1 = __importDefault(require("./routes/shop"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const config_1 = __importDefault(require("./config/config"));
const body_parser_1 = __importDefault(require("body-parser"));
const socket_io_1 = require("socket.io");
dotenv_1.default.config();
// Create instance server
const app = (0, express_1.default)();
//set time vietname
process.env.TZ = 'Asia/Ho_Chi_Minh';
app.use(express_1.default.json({
    limit: '50mb',
}));
app.use(express_1.default.urlencoded({ limit: '50mb', extended: true }));
app.use((0, body_parser_1.default)());
// app.use(
//   bodyParser.json({
//     limit: '500kb',
//   })
// );
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
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:3001', 'http://localhost:4005'],
    // origin: [
    //   '*',
    //   config.domain_admin,
    //   config.domain_web_client,
    //   config.domain_web_client_shop,
    //   'https://super-food-vn.vercel.app',
    //   'http://localhost:3001',
    //   'http://localhost:4005',
    //   'https://admin-super-food.vercel.app',
    // ],
    //   methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH', 'OPTIONS'],
    credentials: true,
    preflightContinue: false,
}));
// Setup socketio
/*
// Apply the rate limiting middleware to all request
// app.use(
//   ratelimit({
//     // 15 minutes
//     windowMs: 15 * 60 * 1000,
//     max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
//     standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//     legacyHeaders: false, // Disable the `X-RateLimit-*` headers
//   })
// );*/
// Add routing for / path
app.use('/api', routes_1.default);
app.use('/api/v1/sp-shop', shop_1.default);
app.use(error_middleware_1.default);
const server = app.listen(process.env.PORT || 8080, () => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.default.connect();
    console.log(`🚀 🚀  Server running into http://localhost:${process.env.PORT} 🚀  🚀 `);
}));
const io = new socket_io_1.Server(server, {
    cors: {
        origin: ['http://localhost:3001', 'http://localhost:3000'],
        methods: ['GET', 'POST'],
    },
});
io.use((socket, next) => {
    try {
        socket.data.auth_isLogin = false;
        const { cookie } = socket.request.headers;
        const bearer = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[0].toLowerCase();
        const token = cookie === null || cookie === void 0 ? void 0 : cookie.split('=')[1];
        if (token && bearer === 'jwt') {
            jsonwebtoken_1.default.verify(token, config_1.default.refresh_token_secret, (err, decoded) => {
                if (err) {
                    next(new Error(' Please try again'));
                }
                else {
                    console.log('LOG : ', decoded);
                    if (decoded) {
                        socket.data.auth_isLogin = true;
                        socket.data.auth_data = decoded;
                        next();
                    }
                }
            });
        }
    }
    catch (err) {
        next(new Error(`Error ${err}`));
        socket.data.auth_isLogin = false;
    }
});
io.on('connection', socket => {
    if (socket.data.auth_data.code_role.trim() === 'ROLE-WIXO-USER') {
        socket.join(socket.data.auth_data.code_user.trim());
    }
    if (socket.data.auth_data.code_role.trim() === 'ROLE-WIXX-SHOP') {
        console.log('CONNECT : ', socket.data.auth_data);
        socket.join(socket.data.auth_data.code_shop.trim());
    }
    socket.on('notification_order', data => {
        if (data) {
            io.emit('notification_order_all', {
                message: `Tài khoản ${socket.data.auth_data.code_user.trim()} vừa đặt hàng thành công`,
            });
            data.code_shop.map(item => {
                io.to(item.code_shop.trim()).emit('notification_order_shop', {
                    quatity: item.cartItem.length,
                    message: `Đặt hàng mã ${socket.data.auth_data.phone}`,
                });
            });
        }
    });
    socket.on('notification_progress_1', data => {
        io.to(data.item.code_user.trim()).emit('notification_progress', {
            status: 2,
            code_order: data.item.code_order,
            message: `Đơn hàng bạn đã được xác nhận : ${data.item.code_order}`,
        });
    });
    socket.on('notification_progress_2', data => {
        io.to(data.item.code_user.trim()).emit('notification_progress', {
            status: 2,
            code_order: data.item.code_order,
            message: `Đơn hàng bạn đang được chế biến : ${data.item.code_order}`,
        });
    });
    socket.on('notification_progress_3', data => {
        io.to(data.item.code_user.trim()).emit('notification_progress', {
            status: 3,
            code_order: data.item.code_order,
            message: `Đơn hàng đã được chế biên xong - đang chờ shipper giao hàng : ${data.item.code_order}`,
        });
    });
    socket.on('notification_progress_4', data => {
        io.to(data.item.code_user.trim()).emit('notification_progress', {
            status: 3,
            code_order: data.item.code_order,
            message: `Đơn hàng bạn đã được giao cho shipper: ${data.item.code_order}`,
        });
    });
    socket.on('notification_progress_cancel', data => {
        io.to(data.item.code_user.trim()).emit('notification_progress', {
            status: -1,
            code_order: data.item.code_order,
            message: `Đơn hàng bạn đã bị hủy bởi người bán : ${data.item.code_order}`,
        });
    });
    socket.on('notification_follow', data => {
        io.to(data.code_shop.trim()).emit('notification_follow', {
            code_user: '---------',
            message: 'Bạn nhận được 1 lượt theo dõi từ người dùng',
        });
    });
    socket.on('messenger_send_to_shop', data => {
        io.to(data.code_shop.trim()).emit('notification_messenger_shop', {
            code_shop: data.code_user,
            message: 'Bạn có 1 tin nhắn mới từ khách hàng',
        });
    });
    socket.on('messenger_send_to_user', data => {
        io.to(data.code_user.trim()).emit('notification_messenger_user', {
            code_shop: data.code_shop,
            message: 'Bạn có 1 tin nhắn mới từ Shop',
        });
    });
    socket.on('disconnect', () => {
        console.log('disconnect : ', socket.data.auth_data);
    });
});
exports.default = app;
