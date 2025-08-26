export default function reservationRatingRepository(repository) {
    const findAllByReservationIdPaging = (reservationId, page, limit) => repository.findAllByReservationIdPaging(reservationId, page, limit);
    const findAllByReservationId = (reservationId) => repository.findAllByReservationId(reservationId);
    const findAvgRatingByReservationId = (reservationId) => repository.findAvgRatingByReservationId(reservationId);
    const findAll = (reservationId) => repository.findAll(reservationId);
    const add = (rating) => repository.add(rating);
    const updateById = (id, sportsField) => repository.updateById(id, sportsField);
    const deleteById = (id) => repository.deleteById(id);

    return {
        findByOwnerId, 
        findByOwnerIdPaging,
        findAllPaging,
        findAll,
        findById,
        add,
        updateById,
        deleteById
    };
}