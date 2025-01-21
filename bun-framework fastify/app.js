// import cluster from "cluster";
// import os from "os";
// import { dirname } from "path";
// import { fileURLToPath } from "url";

// const __dirname = dirname(fileURLToPath(import.meta.url));

// const cpuCount = os.cpus().length;

// console.log(`The total number of CPUs is ${cpuCount}`);
// console.log(`Primary pid=${process.pid}`);
// cluster.setupPrimary({
//   exec: __dirname + "/src/index.js",
// });

// for (let i = 0; i < cpuCount; i++) {
//   cluster.fork();
// }
// cluster.on("exit", (worker, code, signal) => {
//   console.log(`worker ${worker.process.pid} has been killed`);
//   console.log("Starting another worker");
//   cluster.fork();
// });


import Fastify from "fastify";

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
fastify.listen({ port: 8000}, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    console.log(`Worker ${process.pid} started`);
});