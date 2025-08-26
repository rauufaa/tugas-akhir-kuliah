import { ResponseError } from "../../../src/exceptions/response-error";

export default async function findAll(ownerId, page, limit, sportsFacilityDbRepository, sportsFieldDbRepository, priceListDbRepository, userDbRepository, addressDbRepository) {

    // if (ownerId && page && limit) {
    //     const skip = (page - 1) * limit;
    //     const sportsFacilities = await sportsFacilityDbRepository.findByOwnerIdPaging(ownerId, sportName, skip, limit);
    //     if (!sportsFacilities.length) throw new ResponseError(404, "Sports fields not found")

    //     const facilitiesAddresses = sportsFacilities.map(async (val, i) => {
    //         return await addressDbRepository.findById(val.addressId);
    //     })

    //     const facilitiesOwners = sportsFacilities.map(async (val, i) => {
    //         return await userDbRepository.findById(val.ownerId);
    //     })

    //     const facilitiesSportsFields = sportsFacilities.map(async (val, i) => {
    //         return await sportsFieldDbRepository.findAllBySportsFacilityId(val.id);
    //     })

    //     const sportsFieldsPriceList = facilitiesSportsFields.map(async (val, i) => {
    //         return val.map(async (inVal, j) => {
    //             return await priceListDbRepository.findById(inVal.priceListId);
    //         })
    //     })

    //     return {
    //         detail: sportsFacilities,
    //         owner: facilitiesAddresses,
    //         address: facilitiesOwners,
    //         sportsFields: {
    //             fieldList: facilitiesSportsFields,
    //             priceList: sportsFieldsPriceList
    //         }
    //     }
    // }

    // if (ownerId) {
    //     const sportsFacilities = await repository.findByOwnerId(ownerId, sportName);
    //     if (!sportsFacilities.length) throw new ResponseError(404, "Sports fields not found")

    //     const facilitiesAddresses = sportsFacilities.map(async (val, i) => {
    //         return await addressDbRepository.findById(val.addressId);
    //     })

    //     const facilitiesOwners = sportsFacilities.map(async (val, i) => {
    //         return await userDbRepository.findById(val.ownerId);
    //     })

    //     const facilitiesSportsFields = sportsFacilities.map(async (val, i) => {
    //         return await sportsFieldDbRepository.findAllBySportsFacilityId(val.id);
    //     })

    //     const sportsFieldsPriceList = facilitiesSportsFields.map(async (val, i) => {
    //         return val.map(async (inVal, j) => {
    //             return await priceListDbRepository.findById(inVal.priceListId);
    //         })
    //     })

    //     return {
    //         detail: sportsFacilities,
    //         owner: facilitiesAddresses,
    //         address: facilitiesOwners,
    //         sportsFields: {
    //             fieldList: facilitiesSportsFields,
    //             priceList: sportsFieldsPriceList
    //         }
    //     }
    // }

    // throw new ResponseError(404, "Parameters not found")

    if (!ownerId) {
        throw new ResponseError(404, "Owner ID is required");
    }

    const skip = page && limit ? (page - 1) * limit : null;

    const sportsFacilities = skip !== null
        ? await sportsFacilityDbRepository.findByOwnerIdPaging(ownerId, skip, limit)
        : await sportsFacilityDbRepository.findByOwnerId(ownerId);

    if (!sportsFacilities.length) {
        throw new ResponseError(404, "Sports facilities not found");
    }

    // Fetch related data in parallel
    const facilityAddresses = await Promise.all(
        sportsFacilities.map(val => addressDbRepository.findById(val.addressId))
    );

    const facilityOwners = await Promise.all(
        sportsFacilities.map(val => userDbRepository.findById(val.ownerId))
    );

    const facilityFields = await Promise.all(
        sportsFacilities.map(val => sportsFieldDbRepository.findAllBySportsFacilityId(val.id))
    );

    const priceListsNested = await Promise.all(
        facilityFields.map(async fields =>
            await Promise.all(fields.map(field =>
                priceListDbRepository.findById(field.priceListId)
            ))
        )
    );

    return {
        detail: sportsFacilities,
        address: facilityAddresses,
        owner: facilityOwners,
        sportsFields: {
            fieldList: facilityFields,
            priceList: priceListsNested
        }
    };
}