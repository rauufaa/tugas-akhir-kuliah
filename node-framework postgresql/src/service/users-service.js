import { ResponseError } from "../error/response-error.js";

import { pool, queryBuilder } from "../app/database.js";



// {
//     self: {
//         GET: `/api/users?page=${page}&size=${size}`
//     },
//     create: {
//         POST: `/api/users`
//     },
// }

const getAll = async (page, size) => {
    page = Math.round(page);
    size = Math.round(size);

    if (!page || !size) throw new ResponseError(400, "Params page and size must be integer");

    const skip = (page - 1) * size;

    const pageLink = {}
    const linkPage = []

    const query = "WITH a AS (SELECT COUNT(*) as total_users FROM users) SELECT a.total_users, users.user_id, users.first_name, users.last_name FROM users, a ORDER BY users.user_id DESC LIMIT $1 OFFSET $2";
    const params = [size, skip]

    const results = await queryBuilder(query, params)

    // const totalElements = Number(results.rows[0].total_users)
    // const totalPages = Math.ceil(Number(results.rows[0].total_users)/size)

    linkPage.push({
        rel: 'self',
        href: `/api/users?page=${page}&size=${size}`,
        action: 'GET'
    })

    page - 1 != 0 && linkPage.push({
        rel: 'prev',
        href: `/api/users?page=${page-1}&size=${size}`,
        action: 'GET'
    })

    totalElements - (page * size) > 0 && linkPage.push({
        rel: 'next',
        href: `/api/users?page=${page + 1}&size=${size}`,
        action: 'GET'
    })

    linkPage.push({
        rel: 'first',
        href: `/api/users?page=1&size=${size}`,
        action: 'GET'
    })

    linkPage.push({
        rel: 'last',
        href: `/api/users?page=${totalPages}&size=${size}`,
        action: 'GET'
    })

    return {
        users: results.rows.map((value) => {
            return {
                user_id: value.user_id,
                first_name: value.first_name,
                last_name: value.last_name,
            }
        }),
        page: {
            number: page,
            size: size,
            totalElements: results.rows[0].total_users,
            totalPages: Math.ceil(results.rows[0].total_users/size)
        },
        links: linkPage
    };

    
}

const get = async (user_id) => {
    let query = "SELECT * FROM users WHERE user_id=$1 LIMIT 1";
    let params = [user_id];

    const results = await queryBuilder(query, params);

    if (!results.rows[0]) throw new ResponseError(404, "User not found");

    return {
        ...results.rows[0],
        links: [
            {
                rel: 'self',
                href: `/api/users/${results.rows[0].user_id}`,
                action: 'GET'
            },
            {
                rel: 'update',
                href: `/api/users/${results.rows[0].user_id}`,
                action: 'PUT'
            },
            {
                rel: 'update',
                href: `/api/users/${results.rows[0].user_id}`,
                action: 'PATCH'
            },
            {
                rel: 'delete',
                href: `/api/users/${results.rows[0].user_id}`,
                action: 'DELETE'
            },
        ]
    };
}

const post = async (body) => {
    let query = "INSERT INTO users (first_name, last_name, bio, phone_number, email, gender) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
    let params = [body.first_name, body.last_name, body.bio, body.phone_number, body.email, body.gender];

    const client = await pool.connect();

    try {
        await client.query('BEGIN')

        const results = await client.query(query, params)
        await client.query('COMMIT')
        return {
            ...results.rows[0],
            links: [
                {
                    rel: 'self',
                    href: `/api/users/${results.rows[0].user_id}`,
                    action: 'GET'
                },
                {
                    rel: 'update',
                    href: `/api/users/${results.rows[0].user_id}`,
                    action: 'PUT'
                },
                {
                    rel: 'update',
                    href: `/api/users/${results.rows[0].user_id}`,
                    action: 'PATCH'
                },
                {
                    rel: 'delete',
                    href: `/api/users/${results.rows[0].user_id}`,
                    action: 'DELETE'
                },
            ]
        };
    } catch (e) {
        await client.query('ROLLBACK')
        throw new ResponseError(400, "Failed");
    } finally {
        client.release()
    }
}

const put = async (body, user_id) => {
    let query = "UPDATE users SET first_name=$1, last_name=$2, bio=$3, phone_number=$4, email=$5, gender=$6 WHERE user_id=$7 RETURNING *";
    let params = [body.first_name, body.last_name, body.bio, body.phone_number, body.email, body.gender, user_id];
    const client = await pool.connect();
    try {
        await client.query('BEGIN')

        const results = await client.query(query, params)
        await client.query('COMMIT')
        return {
            ...results.rows[0],
            links: [
                {
                    rel: 'self',
                    href: `/api/users/${results.rows[0].user_id}`,
                    action: 'GET'
                },
                {
                    rel: 'update',
                    href: `/api/users/${results.rows[0].user_id}`,
                    action: 'PUT'
                },
                {
                    rel: 'update',
                    href: `/api/users/${results.rows[0].user_id}`,
                    action: 'PATCH'
                },
                {
                    rel: 'delete',
                    href: `/api/users/${results.rows[0].user_id}`,
                    action: 'DELETE'
                },
            ]
        };
    } catch (e) {
        console.log(e)
        await client.query('ROLLBACK')
        throw new ResponseError(400, "Failed");
    } finally {
        client.release()
    }
}

const patch = async (body, user_id = Number(user_id)) => {
    if (!body.first_name && !body.last_name && !body.bio && !body.phone_number && !body.email && !body.gender) {
        return "No Action";
    }

    let query = "UPDATE users SET ";
    let params = [];
    let paramsIndex = 1;

    body.first_name && (
        query = query + `first_name=$${paramsIndex++}, `,
        params.push(body.first_name)
    );
    body.last_name && (
        query = query + `last_name=$${paramsIndex++}, `,
        params.push(body.last_name)
    );
    body.bio && (
        query = query + `bio=$${paramsIndex++}, `,
        params.push(body.bio)
    );
    body.phone_number && (
        query = query + `phone_number=$${paramsIndex++}, `,
        params.push(body.phone_number)
    );
    body.email && (
        query = query + `email=$${paramsIndex++}, `,
        params.push(body.email)
    );
    body.gender && (
        query = query + `gender=$${paramsIndex++} `,
        params.push(body.gender)
    );

    query = query + `WHERE user_id=$${paramsIndex++} `;
    query = query + "RETURNING *";
    params.push(user_id)

    const client = await pool.connect();
    try {
        await client.query('BEGIN')
        const results = await client.query(query, params)
        await client.query('COMMIT')
        return {
            ...results.rows[0],
            links: [
                {
                    rel: 'self',
                    href: `/api/users/${results.rows[0].user_id}`,
                    action: 'GET'
                },
                {
                    rel: 'update',
                    href: `/api/users/${results.rows[0].user_id}`,
                    action: 'PUT'
                },
                {
                    rel: 'update',
                    href: `/api/users/${results.rows[0].user_id}`,
                    action: 'PATCH'
                },
                {
                    rel: 'delete',
                    href: `/api/users/${results.rows[0].user_id}`,
                    action: 'DELETE'
                },
            ]
        };
    } catch (e) {
        await client.query('ROLLBACK')
        throw new ResponseError(400, "Failed");
    } finally {
        client.release()
    }
}

const remove = async (user_id) => {
    let query = "DELETE FROM users WHERE user_id=$1 RETURNING user_id";
    let params = [user_id];

    const client = await pool.connect();
    try {
        await client.query('BEGIN')
        const results = await client.query(query, params)
        await client.query('COMMIT')
        if(results.rowCount<1) throw new ResponseError(404, 'User not found');
    } catch (e) {
        await client.query('ROLLBACK')
        throw new ResponseError(400, "Failed");
    } finally {
        client.release()
    }
}

export default {
    getAll,
    get,
    post,
    put,
    patch,
    remove
}