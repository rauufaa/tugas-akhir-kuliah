import addRating from "../../application/use-cases/reservation/add-rating";
import findRatingById from "../../application/use-cases/reservation/findall-rating-by-id";
import findAll from "../../application/use-cases/sportsfields/findall";
import findAllPaging from "../../application/use-cases/sportsfields/find-all-paging";
import findById from "../../application/use-cases/sportsfields/find-by-id";

export default function reservationController(
    reservationDBRepository,
    reservationDBRepositoryImpl
) {
    const dbRepository = reservationDBRepository(reservationDBRepositoryImpl());

    const getReservation = async (request) => {
        let id = request.params.id
        try {
            const reservation = await findById(id, dbRepository);
            return reservation
        } catch (error) {
            throw error;
        }

    }
    const getAllReservations = async (request) => {
        let ownerId = request.query.filter_by_owner_id
        let sportName = request.query.filter_by_sport
        let page = request.query.page
        let limit = request.query.limit

        try {
            const sportsfields = await findAll(ownerId, sportName, page, limit, dbRepository);
            return sportsfields
        } catch (error) {
            throw error;
        }

    }

    const postReservation = async (request) => {
        let ownerId = request.query.filter_by_owner_id
        let sportName = request.query.filter_by_sport
        let page = request.query.page
        let limit = request.query.limit

        try {
            const sportsfields = await add(ownerId, sportName, page, limit, dbRepository);
            return sportsfields
        } catch (error) {
            throw error;
        }

    }

    const putReservationStatus = async (request) => {

        let state = request.body.state
        let reservationId = request.params.reservation_id

        try {
            const sportsfields = await updateStatusById(reservationId, { state }, dbRepository);
            return sportsfields
        } catch (error) {
            throw error;
        }

    }

    const getReservationRating = async (request) => {
        let ownerId = request.query.filter_by_owner_id
        let sportName = request.query.filter_by_sport
        let page = request.query.page
        let limit = request.query.limit

        let reservationId = request.params.reservation_id

        let rating = request.body.rating
        let description = request.body.description

        try {
            const sportsfields = await findRatingById(ownerId, sportName, page, limit, dbRepository);
            return sportsfields
        } catch (error) {
            throw error;
        }

    }

    const postReservationRating = async (request) => {
        // let ownerId = request.query.filter_by_owner_id
        // let sportName = request.query.filter_by_sport
        // let page = request.query.page
        // let limit = request.query.limit

        let reservationId = request.params.reservation_id

        let rating = request.body.rating
        let description = request.body.description

        try {
            const sportsfields = await addRating(reservationId, { rating, description }, dbRepository);
            return sportsfields
        } catch (error) {
            throw error;
        }

    }

    return {
        getSportsField,
        getAllSportsFields
    }
}