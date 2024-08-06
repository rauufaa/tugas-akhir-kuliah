import { ResponseError } from "../error/response-error";

import { queryBuilder } from "../app/database";

const getAll = async (page, size) => {
    page = Math.round(page);
    size = Math.round(size);

    if (!page || !size) throw new ResponseError(400, "Params page and size must be integer");

    let query = "SELECT COUNT(*) as total FROM `Users`";
    let params = [];

    const [ resultsPage, fieldsPage ] = await queryBuilder(query, params);

    const skip = (page - 1) * size;

    const pageLink = {}

    page - 1 != 0 && (pageLink.prev = { GET: `/api/users?page=${page - 1}&size=${size}` });
    resultsPage.at(0).total - (page * size) > 0 && (pageLink.next = { GET: `/api/users?page=${page + 1}&size=${size}` });

    query = "SELECT * FROM `Users` LIMIT " + skip + ", " + size;
    params = [];

    const [ results, fields ] = await queryBuilder(query, params);

    return {
        users: results.map((value) => {
            const _links = {
                self: {
                    GET: `/api/users/${value.user_id}`
                },
                edit: {
                    PUT: `/api/users/${value.user_id}`,
                    PATCH: `/api/users/${value.user_id}`
                },
                delete: {
                    DELETE: `/api/users/${value.user_id}`
                },
            }
            return {
                ...value,
                _links
            }
        }),
        paging: {
            page: page,
            size: size,
            _links: {
                ...pageLink
            }
        },
        _links: {
            self: {
                GET: `/api/users`
            },
            create: {
                POST: `/api/users`
            },
        }
    };
}

const get = async (user_id) => {
    let query = "SELECT * FROM `Users` WHERE `user_id`=? LIMIT 1";
    let params = [user_id];

    const [ results, fields ] = await queryBuilder(query, params);

    if (!results.at(0)) throw new ResponseError(404, "User not found");

    return {
        ...results.at(0),
        _links: {
            self: {
                GET: `/api/users/${user_id}`
            },
            edit: {
                PUT: `/api/users/${user_id}`,
                PATCH: `/api/users/${user_id}`
            },
            delete: {
                DELETE: `/api/users/${user_id}`
            },
        }
    };
}

const post = async (body) => {
    let query = "INSERT INTO `Users` (`first_name`, `last_name`, `bio`, `phone_number`, `email`, `gender`) VALUES (?, ?, ?, ?, ?, ?)";
    let params = [body.first_name, body.last_name, body.bio, body.phone_number, body.email, body.gender];

    const [ results, fields ] = await queryBuilder(query, params);

    if(results.affectedRows===-1) throw new ResponseError(500, "Failed to add");

    query = "SELECT * FROM `Users` WHERE `user_id`=? LIMIT 1";
    params = [results.insertId];

    const [ resultsSearch, fieldsSearch ] = await queryBuilder(query, params);

    if (!resultsSearch.at(0)) throw new ResponseError(404, "Failed");
    
    return {
        ...resultsSearch.at(0),
        _links: {
            self: {
                GET: `/api/users/${resultsSearch.at(0).user_id}`
            },
            edit: {
                PUT: `/api/users/${resultsSearch.at(0).user_id}`,
                PATCH: `/api/users/${resultsSearch.at(0).user_id}`,
            },
            delete: {
                DELETE: `/api/users/${resultsSearch.at(0).user_id}`
            },
        }
    };
}

const put = async (body, user_id) => {
    let query = "UPDATE `Users` SET `first_name`=?, `last_name`=?, `bio`=?, `phone_number`=?, `email`=?, `gender`=? WHERE `user_id`=?";
    let params = [body.first_name, body.last_name, body.bio, body.phone_number, body.email, body.gender, user_id];

    const [ results, fields ] = await queryBuilder(query, params);

    if (results.affectedRows===-1) throw new ResponseError(404, "Failed");

    query = "SELECT * FROM `Users` WHERE `user_id`=? LIMIT 1";
    params = [user_id];

    const [ resultsSearch, fieldsSearch ] = await queryBuilder(query, params);

    if (!resultsSearch.at(0)) throw new ResponseError(404, "Failed");

    return {
        ...resultsSearch.at(0),
        _links: {
            self: {
                GET: `/api/users/${resultsSearch.at(0).user_id}`
            },
            edit: {
                PUT: `/api/users/${resultsSearch.at(0).user_id}`,
                PATCH: `/api/users/${resultsSearch.at(0).user_id}`,
            },
            delete: {
                DELETE: `/api/users/${resultsSearch.at(0).user_id}`
            },
        }
    };
}

const patch = async (body, user_id=Number(user_id)) => {
    if (!body.first_name && !body.last_name && !body.bio && !body.phone_number && !body.email && !body.gender) {
        return "No Action";
    }

    let query = "UPDATE `Users` SET ";
    let params = [];

    body.first_name && (
        query = query + "`first_name`=?, ",
        params.push(body.first_name)
    );
    body.last_name && (
        query = query + "`last_name`=?, ",
        params.push(body.last_name)
    );
    body.bio && (
        query = query + "`bio`=?, ",
        params.push(body.bio)
    );
    body.phone_number && (
        query = query + "`phone_number`=?, ",
        params.push(body.phone_number)
    );
    body.email && (
        query = query + "`email`=?, ",
        params.push(body.email)
    );
    body.gender && (
        query = query + "`gender`=? ",
        params.push(body.gender)
    );

    query = query + "WHERE `user_id`=?";
    params.push(user_id)

    const [ results, fields ] = await queryBuilder(query, params);

    if (results.affectedRows===-1) throw new ResponseError(404, "Failed");

    query = "SELECT * FROM `Users` WHERE `user_id`=? LIMIT 1";
    params = [user_id];

    const [ resultsSearch, fieldsSearch ] = await queryBuilder(query, params);

    if (!resultsSearch.at(0)) throw new ResponseError(404, "Failed");

    return {
        ...resultsSearch.at(0),
        _links: {
            self: {
                GET: `/api/users/${resultsSearch.at(0).user_id}`
            },
            edit: {
                PUT: `/api/users/${resultsSearch.at(0).user_id}`,
                PATCH: `/api/users/${resultsSearch.at(0).user_id}`,
            },
            delete: {
                DELETE: `/api/users/${resultsSearch.at(0).user_id}`
            },
        }
    };
}

const remove = async (user_id) => {
    let query = "SELECT * FROM `Users` WHERE `user_id`=? LIMIT 1";
    let params = [user_id];

    const [ resultsSearch, fieldsSearch ] = await queryBuilder(query, params);

    if (!resultsSearch) throw new ResponseError(404, "Failed");

    query = "DELETE FROM `Users` WHERE `user_id`=?";
    params = [user_id];

    const [ results, fields ] = await queryBuilder(query, params);

    if (results.affectedRows===-1) throw new ResponseError(404, "Failed");

    return {
        userDelete: resultsSearch.at(0),
        _links: {
            read: {
                GET: `/api/users`
            },
            create: {
                POST: `/api/users`
            },
        }
    };
}

export default {
    getAll,
    get,
    post,
    put,
    patch,
    remove
}