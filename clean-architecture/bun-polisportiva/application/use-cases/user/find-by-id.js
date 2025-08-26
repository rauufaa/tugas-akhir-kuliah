import { ResponseError } from "../../../src/exceptions/response-error"

export default async function findById(id, userRepository, addressRepository) {

    const user = await userRepository.findById(id)
    if (!user) throw new ResponseError(404, "User not found")
    const address = await addressRepository.findById(id)
    if (!address) throw new ResponseError(404, "User not found")
    return { user, address }
}