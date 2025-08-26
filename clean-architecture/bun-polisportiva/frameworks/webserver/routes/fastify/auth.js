export default function authRoutes(fastify) {
    const controller = userControllerFastify(showRepository, showPostgresRepository)

    fastify.post('/login', { schema: getNetflixSchema }, async (request, reply) => {
        const result = await controller.getShow(request.params)
        reply.code(200).send({ ok: "SUCCED ", data: result })

    })

    fastify.post('/register', { schema: getNetflixSchema }, async (request, reply) => {
        const result = await controller.getShow(request.params)
        reply.code(200).send({ ok: "SUCCED ", data: result })
    })
}