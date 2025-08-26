import userRepositoryInterface from "../../../../application/repositories/user-repository"
import userRepositoryImpl from "../../../database/postgres/repositories/user-repository"
import addressRepositoryInterface from "../../../../application/repositories/address-repository"
import addressRepositoryImpl from "../../../database/postgres/repositories/address-repository"
import userController from "../../../../adapters/controllers/user-controller"

export default function userRoutes(fastify) {
    const controller = userController(userRepositoryInterface, userRepositoryImpl, addressRepositoryInterface, addressRepositoryImpl)

    fastify.get('/:id', { schema: getNetflixSchema }, async (request, reply) => {
        const result = await controller.getUser(request)
        reply.code(result.statusCode).send(result)

    })

    fastify.post('/', { schema: getNetflixSchema }, async (request, reply) => {
        const result = await controller.postNewUser(request)
        reply.code(result.statusCode).send(result)
    })
}