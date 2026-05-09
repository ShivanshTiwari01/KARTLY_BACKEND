import mongoose from 'mongoose';
import { logger } from '../app';

const MONGO_URI = process.env.MONGO_URI || '';

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI);

    logger.info('Database connected');
  } catch (err) {
    logger.error({ 'Database Connection Error': err });
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    logger.error({ 'Error closing Database connection during shutdown': err });
    process.exit(1);
  }
});
