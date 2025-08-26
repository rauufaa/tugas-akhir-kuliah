import { ResponseError } from "../../../src/exceptions/response-error";

export default async function findAll(ownerId, sportName, page, limit, repository) {

    // if (ownerId && sportName && page && limit) {
    //     const skip = (page - 1) * limit;
    //     const sportsFields = await repository.findByOwnerIdSportNamePaginated(ownerId, sportName, skip, limit);
    //     if (!sportsFields.length) throw new ResponseError(404, "Sports fields not found")
    //     return sportsFields
    // }

    // if (ownerId && page && limit) {
    //     const skip = (page - 1) * limit;
    //     const sportsFields = await repository.findByOwnerIdPaginated(ownerId, skip, limit);
    //     if (!sportsFields.length) throw new ResponseError(404, "Sports fields not found")
    //     return sportsFields
    // }

    // if (sportName && page && limit) {
    //     const skip = (page - 1) * limit;
    //     const sportsFields = await repository.findBySportNamePaginated(sportName, skip, limit);
    //     if (!sportsFields.length) throw new ResponseError(404, "Sports fields not found")
    //     return sportsFields
    // }

    // if (ownerId && sportName) {
    //     const sportsFields = await repository.findByOwnerIdSportName(ownerId, sportName);
    //     if (!sportsFields.length) throw new ResponseError(404, "Sports fields not found")
    //     return sportsFields
    // }

    // if (ownerId) {
    //     const sportsFields = await repository.findByOwnerId(ownerId);
    //     if (!sportsFields.length) throw new ResponseError(404, "Sports fields not found")
    //     return sportsFields
    // }

    // if (sportName) {
    //     const sportsFields = await repository.findBySportName(sportName);
    //     if (!sportsFields.length) throw new ResponseError(404, "Sports fields not found")
    //     return sportsFields
    // }

    // throw new ResponseError(404, "Parameters not found")

    const hasPagination = page && limit;
    const skip = hasPagination ? (page - 1) * limit : null;

    let sportsFields;

    if (ownerId && sportName && hasPagination) {
        sportsFields = await repository.findByOwnerIdSportNamePaginated(ownerId, sportName, skip, limit);
    } else if (ownerId && hasPagination) {
        sportsFields = await repository.findByOwnerIdPaginated(ownerId, skip, limit);
    } else if (sportName && hasPagination) {
        sportsFields = await repository.findBySportNamePaginated(sportName, skip, limit);
    } else if (ownerId && sportName) {
        sportsFields = await repository.findByOwnerIdSportName(ownerId, sportName);
    } else if (ownerId) {
        sportsFields = await repository.findByOwnerId(ownerId);
    } else if (sportName) {
        sportsFields = await repository.findBySportName(sportName);
    } else {
        throw new ResponseError(404, "Parameters not found");
    }

    if (!sportsFields || !sportsFields.length) {
        throw new ResponseError(404, "Sports fields not found");
    }

    return sportsFields;
}