import { ResponseError } from "../error/response-error.js";


const product = {
    code: "S10_1678",
    name: "1969 Harley Davidson Ultimate Chopper",
    line: "Motorcycles",
    scale: "1:10",
    vendor: "Min Lin Diecast",
    description: "This replica features working kickstand, front suspension, gear-shift lever, footbrake lever, drive chain, wheels and steering. All parts are particularly delicate due to their precise scale and require special care and attention.",
    stock: 7933,
    buyPrice: 48.81,
    retailPrice: 95.70,
};

const get = async (productCode) => {
    if (!productCode) throw new ResponseError(404, "Product not found");

    return {
        ...product,
        _links: {
            self: {
                GET: `/api/products/${product.code}`
            },
            edit: {
                PUT: `/api/products/${product.code}`,
                PATCH: `/api/products/${product.code}`
            },
            delete: {
                DELETE: `/api/products/${product.code}`
            },
        }
    };
}

const post = async (body) => {
    if (!body) throw new ResponseError(400, "Add product failed!");

    // * All in use
    // const productPost = {
    //     code: body.code,
    //     name: body.name,
    //     line: body.line,
    //     scale: body.scale,
    //     vendor: body.vendor,
    //     description: body.description,
    //     stock: body.stock,
    //     buyPrice: body.buyPrice,
    //     retailPrice: body.retailPrice,
    // };

    // * Partially return
    const productPost = {
        code: body.code,
        name: body.name,
    };

    return {
        ...productPost,
        _links: {
            self: {
                GET: `/api/products/${productPost.code}`
            },
            edit: {
                PUT: `/api/products/${productPost.code}`,
                PATCH: `/api/products/${productPost.code}`,
            },
            delete: {
                DELETE: `/api/products/${productPost.code}`
            },
        }
    };
}

const put = async (body, productCode) => {
    if (!body || !productCode) throw new ResponseError(404, "Product not found");

    product.code = body.code ?? product.code;
    product.name = body.name ?? "";
    product.line = body.line ?? "";
    product.scale = body.scale ?? "";
    product.vendor = body.vendor ?? "";
    product.description = body.description ?? "";
    product.stock = body.stock ?? 0;
    product.buyPrice = body.buyPrice ?? 0.0;
    product.retailPrice = body.retailPrice ?? 0.0;

    return {
        ...product,
        _links: {
            self: {
                GET: `/api/products/${product.code}`
            },
            edit: {
                PUT: `/api/products/${product.code}`,
                PATCH: `/api/products/${product.code}`,
            },
            delete: {
                DELETE: `/api/products/${product.code}`
            },
        }
    };
}

const patch = async (body, productCode) => {
    if (!body || !productCode) throw new ResponseError(404, "Product not found");
    
    body.name && (product.name = body.name);
    body.line && (product.line = body.line);
    body.scale && (product.scale = body.scale);
    body.vendor && (product.vendor = body.vendor);
    body.description && (product.description = body.description);
    body.stock && (product.stock = body.stock);
    body.buyPrice && (product.buyPrice = body.buyPrice);
    body.retailPrice && (product.retailPrice = body.retailPrice);

    return {
        code: product.code,
        ...body,
        _links: {
            self: {
                GET: `/api/products/${product.code}`
            },
            edit: {
                PUT: `/api/products/${product.code}`,
                PATCH: `/api/products/${product.code}`,
            },
            delete: {
                DELETE: `/api/products/${product.code}`
            },
        }
    };
}

const remove = async (productCode) => {
    if (!productCode) throw new ResponseError(404, "Product not found");
}

export default {
    get,
    post,
    put,
    patch,
    remove
}