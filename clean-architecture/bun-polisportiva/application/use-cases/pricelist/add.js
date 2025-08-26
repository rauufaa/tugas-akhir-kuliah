import price from "../../../src/entities/price";

export default async function add({
    pricePerHour
}, repository) {

    const newPrice = price({
        pricePerHour: pricePerHour
    })

    const result = await repository.add(price);
    if(!result) throw new ResponseError(404, "Failed to add price")
    return result
}