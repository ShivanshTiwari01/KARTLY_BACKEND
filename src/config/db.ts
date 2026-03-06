import mongoose, { ConnectOptions } from 'mongoose';
import { logger } from '../app';

const MONGO_URI = process.env.MONGO_URI || '';

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);

    logger.info('Database connected');
  } catch (err) {
    logger.error({ err, uri: MONGO_URI }, 'Database Connection Error');
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    logger.error({ err }, 'Error closing Database connection during shutdown');
    process.exit(1);
  }
});
