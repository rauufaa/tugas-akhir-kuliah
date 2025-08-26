import ReservationRating from "../../../src/entities/reservation-rating"
import sportsField from "../../../src/entities/sportsfield"

export default async function addRating(reservationId, {
    rating,
    description
}, reservationDbRepository, reservationRatingDbRepository, sportsFieldDbRepository, userDbRepository, addressDbRepository) {
    const newRating = new ReservationRating({
        rating,
        description,
        reservationId
    })

    const reservationDetail = await reservationDbRepository.findById(reservationId)
    if (!reservationDetail) throw new ResponseError(404, "Reservation is not found")

    const resultNewRatingDetail = await reservationRatingDbRepository.add(newRating)
    if (!resultNewRatingDetail) throw new ResponseError(404, "Failed to add new rating")

    const reservationUserOwnerDetail = await findUserAndAddress(reservationDetail?.ownerId, userDbRepository, addressDbRepository)

    const sportsFieldDetail = reservationDetail.sportsFieldId !== null
        ? await sportsFieldDbRepository.findById(reservationDetail.sportsFieldId)
        : null

    const sportsFieldUserOwnerDetail = await findUserAndAddress(sportsFieldDetail?.ownerId, userDbRepository, addressDbRepository)

    return {
        reservation: resultNewReservation,
        owner: reservationUserOwnerDetail,
        rating: resultNewRatingDetail,
        sportsField: {
            detail: sportsFieldDetail,
            owner: sportsFieldUserOwnerDetail,
        },
    };
}

async function findUserAndAddress(userId, userRepo, addressRepo) {
    const user = userId ? await userRepo.findById(userId) : null;
    const address = user?.addressId ? await addressRepo.findById(user.addressId) : null;
    return { user, address };
}