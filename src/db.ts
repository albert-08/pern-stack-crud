import { Pool } from 'pg';
import db from './config';

const pool = new Pool ({
  user: db.user,
  host: db.host,
  password: db.password,
  database: db.database,
  port: db.port
});

export default pool;