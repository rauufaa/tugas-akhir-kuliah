import usersService from "../service/users-service.js";


const getAll = async (req, res, next) => {
    try {
        const result = await usersService.getAll(req.query.page, req.query.size);
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const get = async (req, res, next) => {
    try {
        const result = await usersService.get(req.params.user_id);
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const post = async (req, res, next) => {
    try {
        const result = await usersService.post(req.body);
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const put = async (req, res, next) => {
    try {
        const result = await usersService.put(req.body, req.params.user_id);
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const patch = async (req, res, next) => {
    try {
        const result = await usersService.patch(req.body, req.params.user_id);
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const remove = async (req, res, next) => {
    try {
        const result = await usersService.remove(req.params.user_id);
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
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