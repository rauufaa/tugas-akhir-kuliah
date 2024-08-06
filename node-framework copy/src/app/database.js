import mysql from 'mysql2/promise';
import { ResponseError } from '../error/response-error.js';

// Create the connection pool. The pool-specific settings are the defaults
export const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'rauufaa',
  database: 'tugas_proyek_kuliah',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

export const queryBuilder = async (query, params) => {
    try {
        const [results, fields] = await pool.execute(query, params);
        return [
            results, fields
        ]
    } catch (error) {
        throw new ResponseError(500, error);
    }
}
