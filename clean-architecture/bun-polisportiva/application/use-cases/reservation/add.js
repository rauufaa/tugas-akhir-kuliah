import Reservation from "../../../src/entities/reservation";
import ReservationStatus from "../../../src/entities/reservation-status";

export default async function add({ sportsFieldId, ownerId, startDate, endDate, createdAt, state, price }, reservationDbRepository, userDbRepository, sportsFieldDbRepository, addressDbRepository) {
    const newReservation = new Reservation({
        sportsFieldId,
        ownerId,
        startDate,
        endDate,
        createdAt,
        state,
        price
    })

    try {
        const resultNewReservation = await reservationDbRepository.add(newReservation)
        if (!resultNewReservation) throw new ResponseError(404, "Failed to add new reservation")

        // const reservationOwnerDetail = resultNewReservation.ownerId !== null
        //     ? await userDbRepository.findById(resultNewReservation.ownerId)
        //     : null

        // const reservationOwnerAddressDetail = reservationOwnerDetail?.addressId
        //     ? await addressDbRepository.findById(reservationOwnerDetail.addressId)
        //     : null
        const reservationUserOwnerDetail = await findUserAndAddress(resultNewReservation?.ownerId, userDbRepository, addressDbRepository)

        const sportsFieldDetail = (resultNewReservation.sportsFieldId !== null)
            ? await sportsFieldDbRepository.findById(resultNewReservation.sportsFieldId)
            : null

        // const sportsFieldOwnerDetail = sportsFieldDetail?.ownerId
        //     ? await userDbRepository.findById(sportsFieldDetail.ownerId)
        //     : null

        // const sportsFieldOwnerAddressDetail = sportsFieldOwnerDetail?.addressId
        //     ? await addressDbRepository.findById(sportsFieldOwnerDetail.addressId)
        //     : null

        const sportsFieldUserOwnerDetail = await findUserAndAddress(sportsFieldDetail?.ownerId, userDbRepository, addressDbRepository)

        // return {
        //     reservation: resultNewReservation,
        //     owner: {
        //         detail: reservationOwnerDetail,
        //         address: reservationOwnerAddressDetail,
        //     },
        //     sportsField: {
        //         detail: sportsFieldDetail,
        //         owner: {
        //             detail: sportsFieldOwnerDetail,
        //             address: sportsFieldOwnerAddressDetail,
        //         },
        //     },
        // };

        return {
            reservation: resultNewReservation,
            owner: reservationUserOwnerDetail,
            sportsField: {
                detail: sportsFieldDetail,
                owner: sportsFieldUserOwnerDetail,
            },
        };

    } catch (error) {
        throw error
    }
}

async function findUserAndAddress(userId, userRepo, addressRepo) {
    const user = userId ? await userRepo.findById(userId) : null;
    const address = user?.addressId ? await addressRepo.findById(user.addressId) : null;
    return { user, address };
}
