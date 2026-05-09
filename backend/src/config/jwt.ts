import dotenv from 'dotenv';
import type { StringValue } from 'ms';

dotenv.config();

export const JWT_ACCESS_SECRET: string =
  process.env.JWT_ACCESS_SECRET || 'access_secret';

export const JWT_REFRESH_SECRET: string =
  process.env.JWT_REFRESH_SECRET || 'refresh_secret';

export const JWT_ACCESS_EXPIRES_IN: StringValue | number =
  (process.env.JWT_ACCESS_EXPIRES_IN as StringValue) || '15m';

export const JWT_REFRESH_EXPIRES_IN: StringValue | number =
  (process.env.JWT_REFRESH_EXPIRES_IN as StringValue) || '7d';
