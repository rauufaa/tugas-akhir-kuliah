export default function reservationsRoutes(fastify) {
    const controller = userControllerFastify(showRepository, showPostgresRepository)

    fastify.get('/reservations', { schema: getNetflixSchema }, async (request, reply) => {
        const result = await controller.getShow(request.params)
        reply.code(200).send({ ok: "SUCCED ", data: result })

    })

    fastify.post('/reservations', { schema: getNetflixSchema }, async (request, reply) => {
        const result = await controller.getShow(request.params)
        reply.code(200).send({ ok: "SUCCED ", data: result })

    })

    fastify.get('/reservations/:id', { schema: getNetflixSchema }, async (request, reply) => {
        const result = await controller.getShow(request.params)
        reply.code(200).send({ ok: "SUCCED ", data: result })

    })
    fastify.put('/reservations/:id/status', { schema: getNetflixSchema }, async (request, reply) => {
        const result = await controller.getShow(request.params)
        reply.code(200).send({ ok: "SUCCED ", data: result })

    })

    fastify.get('/reservations/:id/rating', { schema: getNetflixSchema }, async (request, reply) => {
        const result = await controller.getShow(request.params)
        reply.code(200).send({ ok: "SUCCED ", data: result })

    })
    fastify.post('/reservations/:id/rating', { schema: getNetflixSchema }, async (request, reply) => {
        const result = await controller.getShow(request.params)
        reply.code(200).send({ ok: "SUCCED ", data: result })

    })
}