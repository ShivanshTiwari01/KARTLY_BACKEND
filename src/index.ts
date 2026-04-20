import 'dotenv/config';
import http from 'http';
import green from 'chalk';
import app, { logger } from './app';
import { connectDB } from './config/db';
import { closeRedis, initRedis } from './services/redis';

const createPort = (port: number) => {
  if (process.env.NODE_ENV === 'test') {
    return 5000;
  }
  return port;
};

const PORT = createPort(
  process.env.PORT ? parseInt(process.env.PORT, 10) : 5000
);

const onError = (error: any) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  switch (error.code) {
    case 'EACCES':
      console.error(`Port ${PORT} requires elevated privileges`);
      process.exit(1);
    case 'EADDRINUSE':
      console.error(`Port ${PORT} is already in use`);
      process.exit(1);
    default:
      throw error;
  }
};

const startServer = async () => {
  try {
    await connectDB();
    await initRedis();

    const server = http.createServer(app);

    server.listen(PORT, () => {
      logger.info(`Server listening on port => ${green(PORT.toString())}`);
    });

    server.on('error', onError);

    // Graceful shutdown
    process.on('SIGINT', async () => {
      logger.info('Shutting down...');
      await closeRedis();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      logger.info('Shutting down...');
      await closeRedis();
      process.exit(0);
    });
  } catch (err) {
    logger.error({ 'Failed to start server:': err });
    process.exit(1);
  }
};

startServer();
