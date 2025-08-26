export default function sportsFacilityRepository(repository) {
    const findAllPaging = (ownerId, sportName, page, limit) => repository.findAllPaging(ownerId, sportName, page, limit);
    const findByOwnerIdPaging = (ownerId, skip, limit) => repository.findByOwnerIdPaging(ownerId, skip, limit);
    const findByOwnerId = (ownerId) => repository.findByOwnerId(ownerId);
    const add = (sportsField) => repository.add(sportsField);
    const updateById = (id, sportsField) => repository.updateById(id, sportsField);
    const deleteById = (id) => repository.deleteById(id);

    return {
        findByOwnerId, 
        findByOwnerIdPaging,
        findAllPaging,
        findById,
        add,
        updateById,
        deleteById
    };
}