import cluster from "cluster";
import { cpus } from "os";
import process from "process";
import { web } from "./src/app/web";

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
    web.listen(8000, () => {
        console.log("Running on port 8000...")
    })

    console.log(`Worker ${process.pid} started`);
}

web.listen(8000, () => {
    console.log("Running on port 8000...")
})

