import http from 'http';
import green from 'chalk';
import app, { logger } from './app';

const createPort = (port = 8000) => {
  if (process.env.NODE_ENV === 'test') {
    return 3000;
  }
  return port;
};

const PORT = createPort(
  process.env.PORT ? parseInt(process.env.PORT, 10) : undefined
);

const onError = (error: any) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`Port ${PORT} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`Port ${PORT} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};
const server = http.createServer(app);

server.listen(PORT, () => {
  logger.info(`Server listening on port => ${green(PORT.toString())}`);
});

server.on('error', onError);
