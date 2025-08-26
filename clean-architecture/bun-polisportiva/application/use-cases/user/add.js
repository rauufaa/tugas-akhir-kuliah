import address from "../../../src/entities/address"
import user from "../../../src/entities/user"
import { ResponseError } from "../../../src/exceptions/response-error"

export default async function add({
    username,
    password,
    address: {
        state,
        city,
        streetName,
        streetNumber,
        postcode,
    } = {},
    email,
    firstName,
    lastName,
    fiscalCode,
}, userDbRepository, addressDbRepository, authService) {

    const newAddress = address({
        state,
        city,
        streetName,
        streetNumber,
        postcode
    })

    const hashedPassword = await authService.encryptPassword(password)

    try {
        const addressResult = await addressDbRepository.add(newAddress)
        if (!addressResult) throw new ResponseError(500, "Failed to add address")

        const newUser = user({
            username: username,
            password: hashedPassword,
            addressId: addressResult.id,
            email: email,
            firstName: firstName,
            lastName: lastName,
            fiscalCode: fiscalCode
        })

        const userResult = await userDbRepository.add(newUser)
        if (!userResult) throw new ResponseError(500, "Failed to add address")

        return { userResult, addressResult }
    } catch (error) {
        throw new ResponseError(500, "")
    }
}