import { ResponseError } from "../../../src/exceptions/response-error";

export default async function findById(id, reservationDbRepository, sportsFieldDbRepository, userDbRepository, addressDbRepository) {
    const reservation = await reservationDbRepository.findById(id);
    if (!reservation) throw new ResponseError(404, "Sports field not found")

    const reservationOwnerDetail = reservation.ownerId !== null
        ? await userDbRepository.findById(reservation.owner_id)
        : null
    // if (!reservationOwnerDetail) throw new ResponseError(404, "Show is not found")

    const reservationOwnerAddressDetail = reservationOwnerDetail?.addressId
        ? await addressDbRepository.findById(reservationOwnerDetail.addressId)
        : null
    // if (!reservationOwnerAddressDetail) throw new ResponseError(404, "Show is not found")

    const sportsFieldDetail = reservation.sportsFieldId !== null
        ? await sportsFieldDbRepository.findById(reservation.sportsFieldId)
        : null
    // if (!sportsFieldDetail) throw new ResponseError(404, "Show is not found")

    const sportsFieldOwnerDetail = sportsFieldDetail?.ownerId
        ? await userDbRepository.findById(sportsFieldDetail.ownerId)
        : null
    // if (!sportsFieldOwnerDetail) throw new ResponseError(404, "Show is not found")

    const sportsFieldOwnerAddressDetail = sportsFieldOwnerDetail?.addressId
        ? await addressDbRepository.findById(sportsFieldOwnerDetail.addressId)
        : null
    // if (!sportsFieldOwnerAddressDetail) throw new ResponseError(404, "Show is not found")

    // return {
    //     reservation,
    //     reservationOwnerDetail,
    //     reservationOwnerAddressDetail,
    //     sportsFieldDetail,
    //     sportsFieldOwnerDetail,
    //     sportsFieldOwnerAddressDetail
    // }
    const reservationUserOwnerDetail = {
        user: reservationOwnerDetail,
        address: reservationOwnerAddressDetail
    }

    const sportsFieldUserOwnerDetail = {
        user: sportsFieldOwnerDetail,
        address: sportsFieldOwnerAddressDetail
    }
    return {
        reservation: resultNewReservation,
        owner: reservationUserOwnerDetail,
        sportsField: {
            detail: sportsFieldDetail,
            owner: sportsFieldUserOwnerDetail,
        },
    };
}