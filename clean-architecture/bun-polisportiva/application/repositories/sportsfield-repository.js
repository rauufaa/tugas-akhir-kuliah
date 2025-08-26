export default function sportsFieldsRepository(repository) {
    const findByOwnerIdSportNamePaging = (ownerId, sportName, skip, limit) => repository.findByOwnerIdSportNamePaging(ownerId, sportName, skip, limit);
    const findByOwnerIdPaging = (ownerId, skip, limit) => repository.findByOwnerIdPaging(ownerId, skip, limit);
    const findBySportNamePaging = (sportName, skip, limit) => repository.findBySportNamePaging(sportName, skip, limit);
    const findByOwnerIdSportName = (ownerId, sportName) => repository.findByOwnerIdSportName(ownerId, sportName);
    const findByOwnerId = (ownerId) => repository.findByOwnerId(ownerId);
    const findBySportName = (sportName) => repository.findBySportName(sportName);

    return {
        findByOwnerIdSportNamePaging,
        findByOwnerIdPaging,
        findBySportNamePaging,
        findByOwnerIdSportName,
        findByOwnerId,
        findBySportName,
        // findAllPaging,
        // findById,
        // add,
        // updateById,
        // deleteById
    };
}