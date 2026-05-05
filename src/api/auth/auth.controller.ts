import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { userRegisterSchema, userSignInSchema } from './auth.validation';
import { logger } from '../../app';
import {
  signAccessToken,
  signRefreshToken,
  accessTokenExpiry,
  refreshTokenExpiry,
} from '../../helpers/authentication';

import User from '../../models/user.model';
import UserProfile from '../../models/userProfile.model';
import UserSession from '../../models/userSession.model';

export const register = async (req: Request, res: Response) => {
  try {
    const parsedData: any = userRegisterSchema.safeParse(req.body);

    if (!parsedData) {
      return res.status(400).json({
        success: false,
        message: 'Invalid input data',
      });
    }

    const { email, password } = parsedData.data;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'email and password are required',
      });
    }

    const userExists = await User.findOne({
      email,
    });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists. Please login to continue',
      });
    }

    const username = email.split('@')[0];

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      email,
      password: hashedPassword,
      username,
    });

    const payload = {
      id: user._id,
      email: user.email,
    };

    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    const userSession = await UserSession.create({
      accessToken,
      refreshToken,
      accessTokenExpiry: accessTokenExpiry,
      refreshTokenExpiry: refreshTokenExpiry,
      userId: user._id,
    });

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
    });
  } catch (error) {
    logger.error({ Error: error });
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const parsedData: any = userSignInSchema.safeParse(req.body);

    if (!parsedData) {
      return res.status(400).json({
        success: false,
        message: 'Invalid input data',
      });
    }

    const { email, password } = parsedData.data;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect password',
      });
    }

    const payload = {
      id: user._id,
      email: user.email,
    };

    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    const userSession = await UserSession.create({
      accessToken,
      refreshToken,
      accessTokenExpiry: accessTokenExpiry,
      refreshTokenExpiry: refreshTokenExpiry,
      userId: user._id,
    });

    return res.status(200).json({
      success: true,
      message: 'User Logged In Successfully',
      token: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
