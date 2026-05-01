import express, { Request, Response } from 'express';
import compression from 'compression';
import cors from 'cors';
import methodOverride from 'method-override';
import helmet from 'helmet';
import pino from 'pino';
import passport from './services/passport';
import chalk from 'chalk';
import { rateLimit } from 'express-rate-limit';
import routes from './routes';

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
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  ipv6Subnet: 56,
});

app.use(limiter);

app.get('/', (_req: Request, res: Response) => {
  res.status(401).json({
    error: 'Access denied',
    message: 'Unauthorized access to this resource',
  });
});

app.use('/api', routes);

process.on('SIGINT', async () => {
  process.exit(0);
});

export default app;
