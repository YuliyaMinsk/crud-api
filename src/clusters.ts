import cluster from 'cluster';
import { cpus } from 'os';

import startServer from './server';
import User from './user';

const numCPUs = cpus().length;
// const userDB: User[] = []; // in-memory database

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  startServer();
  console.log(`Worker ${process.pid} started`);
}
