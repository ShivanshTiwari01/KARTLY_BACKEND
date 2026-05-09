import jwt from 'jsonwebtoken';

import {
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN,
} from '../config/jwt';
import ms from 'ms';

export function signAccessToken(payload: object) {
  return jwt.sign(payload, JWT_ACCESS_SECRET, {
    expiresIn: JWT_ACCESS_EXPIRES_IN,
  });
}

export function signRefreshToken(payload: object) {
  return jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRES_IN,
  });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, JWT_ACCESS_SECRET);
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, JWT_REFRESH_SECRET);
}

export const accessTokenExpiry = new Date(
  Date.now() + ms(JWT_ACCESS_EXPIRES_IN as ms.StringValue)
);

export const refreshTokenExpiry = new Date(
  Date.now() + ms((JWT_REFRESH_EXPIRES_IN as ms.StringValue) || '7d')
);
