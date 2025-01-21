export default function product(
    code,
    name,
    line,
    scale,
    vendor,
    description,
    stock,
    buyPrice,
    retailPrice,
) {
    return {
        getCode: () => code,
        getName: () => name,
        getLine: () => line,
        getScale: () => scale,
        getVendor: () => vendor,
        getDescription: () => description,
        getStock: () => stock,
        getBuyPrice: () => buyPrice,
        getRetailPrice: () => retailPrice
    };
}