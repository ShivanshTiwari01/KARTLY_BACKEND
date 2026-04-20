import express, { Request, Response } from 'express';
import compression from 'compression';
import cors from 'cors';
import methodOverride from 'method-override';
import helmet from 'helmet';
import pino from 'pino';
import passport from './services/passport';
import chalk from 'chalk';
import { rateLimit } from 'express-rate-limit';

const app = express();

export const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
});

app.use((req, res, next) => {
  logger.info(`${chalk.yellow(req.method)} ${chalk.green(req.url)}`);
  next();
});

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(methodOverride());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
// If using sessions: app.use(passport.session());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
  // store: ... , // Redis, Memcached, etc. See below.
});

app.use(limiter);

app.get('/', (_req: Request, res: Response) => {
  res.status(403).json({
    error: 'Access denied',
    message: 'Unauthorized access to this resource',
  });
});

process.on('SIGINT', async () => {
  process.exit(0);
});

export default app;
