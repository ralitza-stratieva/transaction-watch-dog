import dotenv from 'dotenv';
import {
  Pool
} from 'pg';

const config = dotenv.config().parsed;

const credentials = {
  user: config.USER,
  host: config.HOST,
  database: config.DATABASE || 'transaction_watch_dog',
  password: config.PASSWORD,
  port: config.DBPORT || 5432
};

const pool = new Pool(credentials);

export default pool;