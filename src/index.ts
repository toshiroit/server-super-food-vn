import express, { Application, Request, Response } from 'express';
import cookie from 'cookie';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import ratelimit from 'express-rate-limit';
import errorMiddleware from './middlewares/error.middleware';
import pool from './database';
import routes from './routes';
import shopRoutes from './routes/shop';
import cookieParser from 'cookie-parser';
import config from './config/config';
import bodyParser from 'body-parser';
import { Server } from 'socket.io';
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from './types/socketio/socketio';
dotenv.config();

// Create instance server
const app: Application = express();
//set time vietname
process.env.TZ = 'Asia/Ho_Chi_Minh';
app.use(
  express.json({
    limit: '50mb',
  })
);
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser());
// app.use(
//   bodyParser.json({
//     limit: '500kb',
//   })
// );
// HTTP request logger middleware
app.use(morgan('common'));
// HTTP Security middleware
app.use(helmet());

// Set limit upload

// set cookies
app.use(cookieParser());
app.use(express.static(__dirname));

// Change domain cors
const ip_connect = config.domain_web_connect_list as string;

app.use(
  cors({
    origin: ip_connect.split(','),
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH', 'OPTIONS'],
    credentials: true,
    preflightContinue: false,
  })
);

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
app.use('/api', routes);
app.use('/api/v1/sp-shop', shopRoutes);

app.use(errorMiddleware);

const server = app.listen(process.env.PORT || 8080, async () => {
  await pool.connect();
  console.log(`🚀 🚀  Server running into http://localhost:${process.env.PORT} 🚀  🚀 `);
});
const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(server, {
  cors: {
    origin: ['http://superfoodvn.tk', 'http://admin.superfoodvn.tk'],
    methods: ['GET', 'POST'],
  },
});

io.use((socket, next) => {
  try {
    socket.data.auth_isLogin = false;
    const cookies = cookie.parse(socket.request.headers.cookie || '');
    if (cookies.jwt) {
      jwt.verify(cookies.jwt, config.refresh_token_secret as unknown as string, (err, decoded) => {
        if (err) {
          next(new Error(' Please try again'));
        } else {
          if (decoded) {
            socket.data.auth_isLogin = true;
            socket.data.auth_data = decoded;
            next();
          }
        }
      });
    }
  } catch (err) {
    next(new Error(`Error ${err}`));
    socket.data.auth_isLogin = false;
  }
});
io.on('connection', socket => {
  if (socket.data.auth_data.code_role.trim() === 'ROLE-WIXO-USER') {
    socket.join(socket.data.auth_data.code_user.trim());
  }
  if (socket.data.auth_data.code_role.trim() === 'ROLE-WIXX-SHOP') {
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

export default app;
