import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import ratelimit from 'express-rate-limit';
import errorMiddleware from './middlewares/error.middleware';
import pool from './database';
import routes from './routes';
import shopRoutes from './routes/shop'
import cookieParser from 'cookie-parser';
import config from './config/config';
import bodyParser from 'body-parser';
import { Server } from 'socket.io'
import http from 'http'
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

io.on('connection', (socket) => {
  socket.on('notification', (data) => {
    io.emit('notification', data)
  })
})


export default app;
