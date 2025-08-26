import add from "../../application/use-cases/user/add";
import findById from "../../application/use-cases/user/find-by-id";
import { ResponseError } from "../../src/exceptions/response-error";

export default function userController(
    userDBRepositoryInterface,
    userDBRepositoryImpl,
    addressDBRepositoryInterface,
    addressDBRepositoryImpl
) {
    const userDbRepository = userDBRepositoryInterface(userDBRepositoryImpl())
    const addressDbRepository = addressDBRepositoryInterface(addressDBRepositoryImpl())

    const postNewUser = async (request) => {
        const username = request.body.username;
        const password = request.body.password;
        const address = {
            state: request.body.address.state,
            city: request.body.address.city,
            streetName: request.body.address.streetName,
            streetNumber: request.body.address.streetNumber,
            postcode: request.body.address.postcode,

        };
        const state = request.body.address.state
        const city = request.body.address.city
        const streetName = request.body.address.streetName
        const streetNumber = request.body.address.streetNumber
        const postcode = request.body.address.postcode
        const email = request.body.email;
        const firstName = request.body.firstName;
        const lastName = request.body.lastName;
        const fiscalCode = request.body.fiscalCode;

        try {
            const { user, address } = await add(
                {
                    username,
                    password,
                    address,
                    email,
                    firstName,
                    lastName,
                    fiscalCode
                }, userDbRepository, addressDbRepository
            )

            return {
                statusCode: 200,
                status: "SUCCESS",
                message: "Success retrieved user data",
                data: {
                    username: user.username,
                    address: {
                        state: address.state,
                        city: address.city,
                        streetName: address.streetName,
                        streetNumber: address.streetNumber,
                        postcode: address.postcode
                    },
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    fiscalCode: user.fiscalCode
                },
            }
        } catch (error) {
            if (error instanceof ResponseError) {
                return {
                    statusCode: error.statusCode,
                    status: "FAILED",
                    message: error.message
                }
            }
            throw error
        }
    }

    const getUser = async (request) => {
        const id = request.params.id

        try {
            const { user, address } = await findById(id, userDbRepository, addressDbRepository)
            return {
                statusCode: 200,
                status: "SUCCESS",
                message: "Success retrieved user data",
                data: {
                    id: user.id,
                    username: user.username,
                    address: {
                        state: address.state,
                        city: address.city,
                        streetName: address.streetName,
                        streetNumber: address.streetNumber,
                        postcode: address.postcode
                    },
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    fiscalCode: user.fiscalCode
                },
            }
        } catch (error) {
            if (error instanceof ResponseError) {
                return error.reconstruct()
            }
            throw error
        }
    }

    return {
        postNewUser,
        getUser
    }
}