import express, { Request, Response } from 'express';
import compression from 'compression';
import cors from 'cors';
import methodOverride from 'method-override';
import helmet from 'helmet';
import pino from 'pino';
import { initRedis, closeRedis } from './services/redis';
import passport from './services/passport';

const app = express();
const logger = pino({ level: 'info', transport: { target: 'pino-pretty' } });

app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    logger.info({
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      responseTime: `${Date.now() - start}ms`,
    });
  });
  next();
});

app.use(cors());
app.use(compression());
app.use(helmet());
app.use(methodOverride());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
// If using sessions: app.use(passport.session());

app.get('/', (req: Request, res: Response) => {
  res
    .status(403)
    .json({
      error: 'Access denied',
      message: 'Unauthorized access to this resource',
    });
});

(async () => {
  await initRedis();
})();

process.on('SIGINT', async () => {
  await closeRedis();
  process.exit(0);
});

export default app;
