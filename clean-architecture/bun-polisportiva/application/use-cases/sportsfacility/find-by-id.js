import { ResponseError } from "../../../src/exceptions/response-error";

export default async function findById(id, sportsFacilityDbRepository, sportsFieldDbRepository, priceListDbRepository, userDbRepository, addressDbRepository) {
    const sportsFacility = await sportsFacilityDbRepository.findById(id);
    if (!sportsFacility) throw new ResponseError(404, "Sports facility not found")

    const facilityAddress = await addressDbRepository.findById(sportsFacility.addressId);
    if (!facilityAddress) throw new ResponseError(404, "Sports field not found")

    const userOwner = await userDbRepository.findById(sportsFacility.ownerId);
    if (!userOwner) throw new ResponseError(404, "Sports field not found")

    const sportsFields = await sportsFieldDbRepository.findAllBySportsFacilityId(sportsFacility.id);
    if (!sportsFields.length) throw new ResponseError(404, "Sports field not found")

    const sportsFieldsPrice = await Promise.all(
        sportsFields.map( val => priceListDbRepository.findById(val.priceListId))
    ) 

    // const sportsFieldsPrice = await priceListDbRepository.findById(sportsFacility.addressId);
    if (!sportsFieldsPrice) throw new ResponseError(404, "Sports field not found")

    return {

        detail: sportsFacility,
        address: facilityAddress,
        owner: userOwner,
        sportsFields: {
            fieldList: sportsFields,
            priceList: sportsFieldsPrice
        }


    }
}