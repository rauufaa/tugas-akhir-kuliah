import findAll from "../../application/use-cases/sportsfields/findall";
import findById from "../../application/use-cases/sportsfields/find-by-id";

export default function sportsFieldsController(
    sportsFieldsDBRepositoryInterface,
    sportsFieldsDBRepositoryImpl
) {
    const sportsFieldDbRepository = sportsFieldsDBRepositoryInterface(sportsFieldsDBRepositoryImpl());

    const getSportsField = async (request) => {
        let id = request.params.id
        try {
            const sportsField = await findById(id, sportsFieldDbRepository);
            return {
                statusCode: 200,
                status: "SUCCESS",
                message: "Success retrieved user data",
                data: sportsField,
            }
        } catch (error) {
            if (error instanceof ResponseError) {
                return error.reconstruct()
            }
            throw error;
        }

    }
    const getAllSportsFields = async (request) => {
        let ownerId = request.query.filter_by_owner_id
        let sportName = request.query.filter_by_sport
        let page = request.query.page
        let limit = request.query.limit

        try {
            const sportsFields = await findAll(ownerId, sportName, page, limit, sportsFieldDbRepository);
            return {
                statusCode: 200,
                status: "SUCCESS",
                message: "Success retrieved user data",
                data: sportsFields,
            }
        } catch (error) {
            if (error instanceof ResponseError) {
                return error.reconstruct()
            }
            throw error;
        }

    }

    return {
        getSportsField,
        getAllSportsFields
    }
}