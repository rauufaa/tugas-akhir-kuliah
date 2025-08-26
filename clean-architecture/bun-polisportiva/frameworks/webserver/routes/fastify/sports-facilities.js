export default function sportsFacilitiesRoutes(fastify) {
    const controller = userControllerFastify(showRepository, showPostgresRepository)

    fastify.get('/sports-facilities', { schema: getNetflixSchema }, async (request, reply) => {
        const result = await controller.getShow(request.params)
        reply.code(200).send({ ok: "SUCCED ", data: result })

    })

    fastify.get('/sports-facilities/:id', { schema: getNetflixSchema }, async (request, reply) => {
        const result = await controller.getShow(request.params)
        reply.code(200).send({ ok: "SUCCED ", data: result })

    })

    fastify.get('/sports-facilities/:id/sports-field', { schema: getNetflixSchema }, async (request, reply) => {
        const result = await controller.getShow(request.params)
        reply.code(200).send({ ok: "SUCCED ", data: result })

    })
}