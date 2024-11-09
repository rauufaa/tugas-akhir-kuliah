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

import cluster from "cluster";
import { cpus } from "os";
import process from "process";
import { web } from "./src/app/web.js";

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    // Start N workers for the number of CPUs
    for (let i = 0; i < cpus().length; i++) {
        cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} exited`);
        console.log("Starting another worker");
        cluster.fork();
    });
} else {
    // Incoming requests are handled by the pool of workers
    // instead of the primary worker.
    web.listen(8000, () => {
        console.log("Running on port 8000...")
    })

    console.log(`Worker ${process.pid} started`);
}