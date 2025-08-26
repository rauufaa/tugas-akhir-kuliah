import sportsField from "../../../src/entities/sportsfield"

export default async function findAvgRatingById(reservationId, dbRepositoryReservation, dbRepositoryReservationRating, dbRepositorySportsField) {

    try {
        const reservationDetail = await dbRepositoryReservation.findById(reservationId)
        if (!reservationDetail) throw new ResponseError(404, "Show is not found")

        const reservationAvgRatings = await dbRepositoryReservationRating.findAvgRatingByReservationId(reservationId)
        if (!reservationAvgRatings) throw new ResponseError(404, "Show is not found")
        
        return reservationAvgRatings
    } catch (error) {
        throw error
    }



}