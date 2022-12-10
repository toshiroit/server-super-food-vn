import { Pool } from 'pg';
import config from '../config/config';
const pool = new Pool({
  host: config.host_db, // Tên máy chủ
  database: config.database_db, // Tên DB kết nối
  user: config.user_db, // Tên tài khoản kết nối
  password: config.pass_db, // mật khẩu kết nối
  port: config.port_DB as number | 5432 | undefined, // Port kết nối đến
  // ssl: {
  //   rejectUnauthorized: false, //  rejectUnauthorized SSL
  // },
  max: 4, // Tối đa kết nối
});
pool.on('error', (error: Error) => {
  console.error(error.message);
});
export default pool;
