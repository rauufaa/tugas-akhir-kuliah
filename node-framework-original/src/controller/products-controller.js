import productsService from "../service/products-service.js";


const get = async (req, res, next) => {
    try {
        const result = await productsService.get(req.params.code);
        res.status(200).json({
            status: 'OK',
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const post = async (req, res, next) => {
    try {
        const result = await productsService.post(req.body);
        res.status(200).json({
            status: 'OK',
            message: 'Product added successfully',
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const put = async (req, res, next) => {
    try {
        const result = await productsService.put(req.body, req.params.code);
        res.status(200).json({
            status: 'OK',
            message: 'Product updated successfully',
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const patch = async (req, res, next) => {
    try {
        const result = await productsService.patch(req.body, req.params.code);
        res.status(200).json({
            status: 'OK',
            message: 'Product partially updated successfully',
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const remove = async (req, res, next) => {
    try {
        await productsService.remove(req.params.code);
        res.status(200).json({
            status: 'OK',
            message: 'Product deleted successfully'
        });
    } catch (error) {
        next(error)
    }
}

export default {
    get,
    post,
    put,
    patch,
    remove
}