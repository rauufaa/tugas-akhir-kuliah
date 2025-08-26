import cluster from 'cluster';
import os from 'os';
import Fastify from 'fastify';

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary process berjalan dengan PID: ${process.pid}`);
  console.log(`Menggunakan ${numCPUs} pekerja (workers)`);

  // Membuat pekerja sebanyak jumlah CPU
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} mati. Membuat pekerja baru...`);
    cluster.fork();
  });
} else {
  // Proses pekerja menjalankan server Fastify
  console.log(`Worker berjalan dengan PID: ${process.pid}`);
  // import('./server.js');
  
  
  const fastify = Fastify({
    logger: true
  });
  
  fastify.get('/', async (request, reply) => {
    return { message: 'Halo dari Fastify!' };
  });
  
  fastify.listen({ port: 3000, host:"127.0.0.1" }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server berjalan di ${address}`);
  });
}
