import { Pool } from 'pg';
import config from '../config/config';
const pool = new Pool({
  host: config.host_db,
  database: config.database_db,
  user: config.user_db,
  password: config.pass_db,
  port: config.port_DB as number | 5432 | undefined,
  max: 4,
});
pool.on('error', (error: Error) => {
  console.error(error.message);
});
export default pool;
