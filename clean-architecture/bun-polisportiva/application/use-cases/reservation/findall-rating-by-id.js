import sportsField from "../../../src/entities/sportsfield"

export default async function findAllRatingById(reservationId, page, limit, dbRepositoryReservation, dbRepositoryReservationRating, dbRepositorySportsField) {

    try {
        const reservationDetail = await dbRepositoryReservation.findById(reservationId)
        if (!reservationDetail) throw new ResponseError(404, "Show is not found")

        const skip = page && limit ? (page - 1) * limit : null

        const reservationRatings = skip !== null
            ? await dbRepositoryReservationRating.findAllByReservationIdPaging(reservationId, skip, limit)
            : await dbRepositoryReservationRating.findAllByReservationId(reservationId)

        // if (page && limit) {
        //     const skip = (page - 1) * limit;
        //     const reservationRatings = await dbRepositoryReservationRating.findAllByReservationIdPaging(reservationId, skip, limit)
        //     if (!reservationRatings) throw new ResponseError(404, "Show is not found")

        //     return
        // }

        // const reservationRatings = await dbRepositoryReservationRating.findAllByReservationId(reservationId)
        if (!reservationRatings) throw new ResponseError(404, "Show is not found")

        return reservationRatings
    } catch (error) {
        throw error
    }



}