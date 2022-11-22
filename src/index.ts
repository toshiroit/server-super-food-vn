import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import ratelimit from 'express-rate-limit';
import errorMiddleware from './middlewares/error.middleware';
import pool from './database';
import routes from './routes';
import shopRoutes from './routes/shop'
import cookieParser from 'cookie-parser';
import config from './config/config';
import bodyParser from 'body-parser';
import { Server } from 'socket.io'
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from './types/socketio/socketio';
dotenv.config();

// Create instance server
const app: Application = express();

app.use(express.json({
  limit: '50mb'
}));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json());
// HTTP request logger middleware
app.use(morgan('common'));
// HTTP Security middleware
app.use(helmet());

// Set limit upload 

// set cookies
app.use(cookieParser());
app.use(express.static(__dirname));

// Change domain cors
app.use(
  cors({
    origin: [
      config.domain_admin, config.domain_web_client, config.domain_web_client_shop,
      'https://super-food-vn.vercel.app',
      'http://localhost:3001',
      'http://localhost:4005',
      'https://admin-super-food.vercel.app'
    ],
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH', 'OPTIONS'],
    credentials: true,
    preflightContinue: false,
  })
);

// Setup socketio 


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


app.use('/api', routes);
app.use('/api/v1/sp-shop', shopRoutes)
app.use(errorMiddleware);

const server = app.listen(process.env.PORT || 8080, async () => {
  await pool.connect();
  console.log(`🚀 🚀  Server running into http://localhost:${process.env.PORT} 🚀  🚀 `);
});
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

io.use((socket, next) => {
  try {
    socket.data.auth_isLogin = false
    const { cookie } = socket.request.headers
    const bearer = cookie?.split('=')[0].toLowerCase();
    const token = cookie?.split('=')[1];
    if (token && bearer === 'jwt') {
      jwt.verify(token, config.refresh_token_secret as unknown as string, (err, decoded) => {
        if (err) {
          next(new Error(' Please try again'))
        }
        else {
          if (decoded) {
            socket.data.auth_isLogin = true
            socket.data.auth_data = decoded
            next()
          }
        }
      })
    }
  } catch (err) {
    next(new Error(`Error ${err}`))
    socket.data.auth_isLogin = false
  }
})
io.on('connection', (socket) => {
  if (socket.data.auth_data.code_role.trim() === 'ROLE-WIXO-USER') {
    socket.join(socket.data.auth_data.code_user)
  }
  if (socket.data.auth_data.code_role.trim() === 'ROLE-WIXX-SHOP') {
    socket.join(socket.data.auth_data.code_shop)
  }
  socket.on('notification_order', (data) => {
    if (data) {
      io.emit('notification_order_all', {
        message: `Tài khoản ${socket.data.auth_data.code_user.trim()} vừa đặt hàng thành công`
      })
      data.code_shop.map((item) => {
        io.to(item.code_shop.trim()).emit('notification_order_shop', {
          quatity: item.cartItem.length,
          message: `Đặt hàng mã ${socket.data.auth_data.phone}`
        })
      })

    }
  })

  socket.on('disconnect', () => {
    console.log('disconnect : ', socket.data.auth_data)
  })
})


export default app;
