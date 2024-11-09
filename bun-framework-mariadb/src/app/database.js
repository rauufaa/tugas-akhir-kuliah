import mariadb from "mariadb";
import { ResponseError } from '../error/response-error';


export const pool =
    mariadb.createPool({
        host: "127.0.0.1",
        port: 3306,
        user: "test_user",
        password: "password",
        database: "test",
    });

export const queryBuilder = async (query, params = []) => {
    try {
        const results = await pool.query(query, params)
        return results
    } catch (error) {
        throw new ResponseError(500, error);
    }
}

export const transactionQueryBuilder = async (query, params = []) => {
    const client = await pool.getConnection();
    try {
        await client.beginTransaction();

        const results = await client.query(query, params)
        await client.commit();
        return results
    } catch (e) {
        console.log(e)
        await client.rollback()
        throw new ResponseError(400, "Failed");
    } finally {
        client.release()
    }
}

