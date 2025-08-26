import sportsFieldsController from "../../../../adapters/controllers/sportsfield-controller"
import sportsFieldsRepository from "../../../../application/repositories/sportsfield-repository"
import sportsFieldsPostgresRepository from "../../../database/postgres/repositories/sportsfield-repository"
import authTokenHandler from "../../handler/authtoken-handler"
import authHandler from "../../handler/authtoken-handler"
import protectedRouteHook from "../../hook/protected-route-hook"

export default function sportsFieldsRoutes(fastify) {
    const controller = sportsFieldsController(sportsFieldsRepository, sportsFieldsPostgresRepository)

    // fastify.get('/sports-fields', { schema: getNetflixSchema, onRequest: [authTokenHandler] }, async (request, reply) => {
    //     const result = await controller.getAllSportsFields(request)
    //     reply.code(200).send({ ok: "SUCCED ", data: result })
    // })

    fastify.get('/', async (request, reply) => {
        const result = await controller.getAllSportsFields(request)
        reply.code(200).send({ ok: "SUCCED ", data: result })
    })

    // fastify.get('/sports-fields/:id', { schema: getNetflixSchema }, async (request, reply) => {
    //     const result = await controller.getSportsField(request)
    //     reply.code(200).send({ ok: "SUCCED ", data: result })

    // })
}