import pg from "pg"
import { ResponseError } from '../error/response-error';

const {Pool} = pg
export const pool = new Pool({
    host: "127.0.0.1",
    user: "wsl-ubuntu",
    password: "bbkracing",
    database: "project_akhir",
    max: 120,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})

export const queryBuilder = async (query, params = []) => {
    try {
        const results = await pool.query(query, params)
        return results
    } catch (error) {
        throw new ResponseError(500, error);
    }
}

