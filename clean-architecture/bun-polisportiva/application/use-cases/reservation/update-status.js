import reservation from "../../../src/entities/reservation"
import reservationStatus from "../../../src/entities/reservation-status"
import { ResponseError } from "../../../src/exceptions/response-error"

function updateStatus(reservationId, state, reservationDbRepository) {

    if (state != reservationStatus.REJECTED || state != reservationStatus.ACCEPTED) {
        throw new ResponseError(400, "State not valid")
    }

    try {
        
        const reservationUpdataResult = reservationDbRepository.updateStatus(reservationId, state)
        if (!reservationUpdataResult) throw new ResponseError(404, "Show is not found")
        
        return reservationUpdataResult
    } catch (error) {
        throw error
    }
}