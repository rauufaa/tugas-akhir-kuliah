import Fastify from "fastify";
import cluster from "cluster";
import { cpus } from "os";
import process from "process";



// export default fastify
// Run the server!
// try {
//     await fastify.listen({ port: 8000 , host: "172.30.114.144"})
// } catch (err) {
//     fastify.log.error(err)
//     process.exit(1)
// }

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    // Start N workers for the number of CPUs
    for (let i = 0; i < cpus().length; i++) {
        cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} exited`);
    });
} else {
    // Incoming requests are handled by the pool of workers
    // instead of the primary worker.
    const fastify = Fastify({
        logger: true
    })
    
    const product = {
        code: "S10_1678",
        name: "1969 Harley Davidson Ultimate Chopper",
        line: "Motorcycles",
        scale: "1:10",
        vendor: "Min Lin Diecast",
        description: "This replica features working kickstand, front suspension, gear-shift lever, footbrake lever, drive chain, wheels and steering. All parts are particularly delicate due to their precise scale and require special care and attention.",
        stock: 7933,
        buyPrice: 48.81,
        retailPrice: 95.70,
    };
    
    fastify.get('/api/products', async function (request, reply) {
        reply.send({
    
            ...product,
            _links: {
                self: {
                    GET: `/api/products/${product.code}`
                },
                edit: {
                    PUT: `/api/products/${product.code}`,
                    PATCH: `/api/products/${product.code}`
                },
                delete: {
                    DELETE: `/api/products/${product.code}`
                },
            }
    
        })
    })
    await fastify.listen({ port: 8000, host: "172.30.114.144" })
    // try {
        
    // } catch (err) {
    //     fastify.log.error(err)
    //     process.exit(1)
    // }

    console.log(`Worker ${process.pid} started`);
}