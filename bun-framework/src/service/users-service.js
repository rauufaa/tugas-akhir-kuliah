import { ResponseError } from "../error/response-error";
import UserDataTest from "../data/UserDataTest.json";

const getAll = async (page, size) => {
    page = Math.round(page);
    size = Math.round(size);

    if (!page || !size) throw new ResponseError(400, "Params page and size must be integer");

    if (UserDataTest.length < page * size) {
        page = 1;
        size = 15;
    }

    const startIndex = size * page - size;
    const endIndex = size * page;

    const pageLink = {}

    page - 1 != 0 && (pageLink.prev = { GET: `/api/users?page=${page - 1}&size=${size}` });
    UserDataTest.length - (page * size) > 0 && (pageLink.next = { GET: `/api/users?page=${page + 1}&size=${size}` });

    return {
        users: UserDataTest.slice(startIndex, endIndex).map((value) => {
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
        meta: {
            length: UserDataTest.length
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
    const user = UserDataTest.find((value, index) => value.user_id == user_id);

    if (!user) throw new ResponseError(404, "User not found");

    return {
        ...user,
        _links: {
            self: {
                GET: `/api/users/${user.user_id}`
            },
            edit: {
                PUT: `/api/users/${user.user_id}`,
                PATCH: `/api/users/${user.user_id}`
            },
            delete: {
                DELETE: `/api/users/${user.user_id}`
            },
        }
    };
}

const post = async (body) => {
    const newUser = {
        user_id: body.user_id,
        first_name: body.first_name,
        last_name: body.last_name,
        bio: body.bio,
        phone_number: body.phone_number,
        email: body.email,
        gender: body.gender,
    };

    UserDataTest.push(newUser);

    return {
        ...newUser,
        _links: {
            self: {
                GET: `/api/users/${newUser.user_id}`
            },
            edit: {
                PUT: `/api/users/${newUser.user_id}`,
                PATCH: `/api/users/${newUser.user_id}`,
            },
            delete: {
                DELETE: `/api/users/${newUser.user_id}`
            },
        }
    };
}

const put = async (body, user_id) => {
    const index = UserDataTest.findIndex(value => value.user_id == user_id);

    if (index === -1) throw new ResponseError(404, "User not found");


    const newUser = {
        user_id: !body.user_id ? UserDataTest[index].user_id : body.user_id,
        first_name: body.first_name ?? "",
        last_name: body.last_name ?? "",
        bio: body.bio ?? "",
        phone_number: body.phone_number ?? "",
        email: body.email ?? "",
        gender: body.gender ?? "",
    };

    UserDataTest[index] = newUser;

    return {
        ...newUser,
        _links: {
            self: {
                GET: `/api/users/${newUser.user_id}`
            },
            edit: {
                PUT: `/api/users/${newUser.user_id}`,
                PATCH: `/api/users/${newUser.user_id}`,
            },
            delete: {
                DELETE: `/api/users/${newUser.user_id}`
            },
        }
    };
}

const patch = async (body, user_id) => {
    if (!body.first_name && !body.last_name && !body.bio && !body.phone_number && !body.email && !body.gender) {
        return "No Action";
    }

    const index = UserDataTest.findIndex(value => value.user_id == user_id);

    if (index === -1) throw new ResponseError(404, "User not found");

    body.first_name && (UserDataTest[index].first_name = body.first_name);
    body.last_name && (UserDataTest[index].last_name = body.last_name);
    body.bio && (UserDataTest[index].bio = body.bio);
    body.phone_number && (UserDataTest[index].phone_number = body.phone_number);
    body.email && (UserDataTest[index].email = body.email);
    body.gender && (UserDataTest[index].gender = body.gender);

    return {
        ...UserDataTest[index],
        _links: {
            self: {
                GET: `/api/users/${user_id}`
            },
            edit: {
                PUT: `/api/users/${user_id}`,
                PATCH: `/api/users/${user_id}`,
            },
            delete: {
                DELETE: `/api/users/${user_id}`
            },
        }
    };
}

const remove = async (user_id) => {
    const index = UserDataTest.findIndex(value => value.user_id == user_id);

    if (index === -1) throw new ResponseError(404, "User not found");

    const userDelete = UserDataTest.splice(index, 1);

    return {
        userDelete: userDelete,
        length: UserDataTest.length,
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